"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Error used when page-owned work is cancelled during navigation or unmount. */
export class NavigationCancelledError extends Error {
  constructor() {
    super("The operation was cancelled because the page was left.");
    this.name = "NavigationCancelledError";
  }
}

type CancellableTask<T> = (signal: AbortSignal) => Promise<T> | T;
type ThreadExit<T> = (value: T) => void;
type ThreadTask<T, Args extends unknown[]> = (
  ...args: [...Args, ThreadExit<T>]
) => void;
type ThreadSource = (...args: unknown[]) => void;

/** A worker-backed promise that can be cancelled by the caller. */
export type CancellableThread<T> = Promise<T> & { abort: () => void };

// The worker receives the function body as source, so its parameter names must
// be available and the task must use a regular function with a block body.
const getThreadBody = (task: ThreadSource) => {
  const source = task.toString();
  const bodyStart = source.indexOf("{");
  const bodyEnd = source.lastIndexOf("}");

  if (bodyStart === -1 || bodyEnd === -1) {
    throw new Error("Thread tasks must use a function with a block body.");
  }

  return {
    body: source.slice(bodyStart + 1, bodyEnd),
    parameterNames: source
      .slice(source.indexOf("(") + 1, source.indexOf(")"))
      .split(",")
      .map((parameter) => parameter.trim())
      .filter(Boolean),
  };
};

/**
 * Creates a cancellation signal for work owned by the current page.
 *
 * The task must cooperate by checking signal.aborted between expensive steps,
 * or by passing the signal to an API that supports AbortSignal.
 *
 * `run` returns `undefined` when navigation cancels the task. `thread` runs
 * synchronous CPU-heavy work in a Web Worker and rejects when it is aborted.
 */
export default function useNavigationCancellation() {
  const [controller] = useState(() => new AbortController());
  const activeThreadsRef = useRef(new Set<() => void>());

  useEffect(() => {
    const activeThreads = activeThreadsRef.current;

    return () => {
      controller.abort(new NavigationCancelledError());
      activeThreads.forEach((abort) => abort());
      activeThreads.clear();
    };
  }, [controller]);

  const isCancelled = useCallback(
    () => controller.signal.aborted,
    [controller],
  );

  const throwIfCancelled = useCallback(() => {
    if (controller.signal.aborted) {
      throw controller.signal.reason ?? new NavigationCancelledError();
    }
  }, [controller]);

  const run = useCallback(
    async <T>(task: CancellableTask<T>): Promise<T | undefined> => {
      try {
        throwIfCancelled();
        const result = await task(controller.signal);
        throwIfCancelled();
        return result;
      } catch (error) {
        if (controller.signal.aborted) {
          return undefined;
        }
        throw error;
      }
    },
    [controller, throwIfCancelled],
  );

  const thread = useCallback(
    <T, Args extends unknown[]>(
      ...args: [...Args, ThreadTask<T, Args>]
    ): CancellableThread<T> => {
      const task = args.pop() as ThreadTask<T, Args>;
      const taskArgs = args;

      let worker: Worker | undefined;
      let settleAbort: (() => void) | undefined;
      let cleanup: (() => void) | undefined;
      let isSettled = false;

      const promise = new Promise<T>((resolve, reject) => {
        const abort = () => {
          if (isSettled) return;
          isSettled = true;
          worker?.terminate();
          cleanup?.();
          reject(controller.signal.reason ?? new NavigationCancelledError());
        };

        settleAbort = abort;
        activeThreadsRef.current.add(abort);

        if (controller.signal.aborted) {
          abort();
          return;
        }

        try {
          const { body, parameterNames } = getThreadBody(task as ThreadSource);
          const exitParameter = parameterNames.pop();

          if (!exitParameter || parameterNames.length !== taskArgs.length) {
            throw new Error("Invalid thread task arguments.");
          }

          const workerSource = `
            const ${exitParameter} = (value) => postMessage(value);
            self.onmessage = ({ data }) => {
              const [${parameterNames.join(", ")}] = data;
              ${body}
            };
          `;
          const workerUrl = URL.createObjectURL(
            new Blob([workerSource], { type: "application/javascript" }),
          );

          worker = new Worker(workerUrl);
          cleanup = () => {
            URL.revokeObjectURL(workerUrl);
            activeThreadsRef.current.delete(abort);
          };

          worker.onmessage = ({ data }: MessageEvent<T>) => {
            if (isSettled) return;
            isSettled = true;
            cleanup?.();
            worker?.terminate();
            resolve(data);
          };
          worker.onerror = (event) => {
            if (isSettled) return;
            isSettled = true;
            cleanup?.();
            worker?.terminate();
            reject(event.error ?? new Error(event.message));
          };
          worker.postMessage(taskArgs);
        } catch (error) {
          isSettled = true;
          activeThreadsRef.current.delete(abort);
          worker?.terminate();
          reject(error);
        }
      }) as CancellableThread<T>;

      promise.abort = () => settleAbort?.();
      return promise;
    },
    [controller],
  );

  return {
    signal: controller.signal,
    /** Whether the current render observed that the page-owned work was cancelled. */
    isCancelled: isCancelled(),
    /** Throws the cancellation reason so a task can stop between expensive steps. */
    throwIfCancelled,
    /** Runs an async task and suppresses its result if navigation happens first. */
    run,
    /** Runs a regular function in a Web Worker; arguments must be structured-cloneable. */
    thread,
  };
}
