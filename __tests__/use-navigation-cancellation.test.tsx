import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useNavigationCancellation from "@hooks/useNavigationCancellation";

class MockWorker {
  static instances: MockWorker[] = [];
  onmessage: ((event: MessageEvent<string>) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  postMessage = vi.fn();
  terminate = vi.fn();

  constructor() {
    MockWorker.instances.push(this);
  }
}

beforeEach(() => {
  MockWorker.instances = [];
  vi.stubGlobal("Worker", MockWorker);
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: vi.fn(() => "blob:thread"),
    revokeObjectURL: vi.fn(),
  });
});

describe("useNavigationCancellation", () => {
  test("aborts its signal when the owning component unmounts", () => {
    const { result, unmount } = renderHook(() => useNavigationCancellation());

    expect(result.current.isCancelled).toBe(false);

    unmount();

    expect(result.current.signal.aborted).toBe(true);
    expect(result.current.signal.reason).toBeInstanceOf(Error);
  });

  test("returns early when a task finishes after navigation", async () => {
    let resolveTask!: (value: string) => void;
    const task = new Promise<string>((resolve) => {
      resolveTask = resolve;
    });
    const { result, unmount } = renderHook(() => useNavigationCancellation());

    let taskResult: string | undefined;
    act(() => {
      void result.current
        .run(() => task)
        .then((value) => {
          taskResult = value;
        });
    });

    unmount();
    await act(async () => {
      resolveTask("stale result");
      await task;
    });

    expect(taskResult).toBeUndefined();
  });

  test("runs a worker task and supports manual abort", async () => {
    const { result } = renderHook(() => useNavigationCancellation());
    const thread = result.current.thread("message", (message, exit) => {
      exit(message);
    });
    const worker = MockWorker.instances[0];

    worker.onmessage?.({ data: "result" } as MessageEvent<string>);
    await expect(thread).resolves.toBe("result");

    const abortedThread = result.current.thread((exit) => {
      void exit;
    });
    abortedThread.abort();

    await expect(abortedThread).rejects.toMatchObject({
      name: "NavigationCancelledError",
    });
    expect(MockWorker.instances[1].terminate).toHaveBeenCalled();
  });
});
