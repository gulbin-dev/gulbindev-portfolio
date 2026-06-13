"use client";

import {
  NextJsIcon,
  TypeScriptIcon,
  ReduxIcon,
  ReactIcon,
  TailwindCSSIcon,
} from "@utils/tabler-icons";
import Tag from "@components/UI/Tag";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import CircularShade from "@components/UI/CircularShade";
import useAnimateStacks from "@hooks/useAnimateStacks";
export default function ProficientStacks() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "500px 0px 0px 0px",
    triggerOnce: true,
  });
  useAnimateStacks({ inView: inView, containerRef: containerRef });
  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="relative tablet:col-start-5 tablet:col-end-10 tablet:row-span-6 tablet:row-start-1 tablet:grid-cols-subgrid tablet:grid-rows-subgrid desktop:col-start-6 desktop:col-end-12"
    >
      <ul
        aria-label="Proficient stacks"
        className="relative z-1 my-4 flex grid-cols-subgrid grid-rows-subgrid flex-wrap gap-x-1.5 gap-y-2.5 tablet:grid"
      >
        <li className="col-span-2 col-start-2 row-start-1">
          <Tag
            className="tags tablet:translate-x-3 tablet:translate-y-15 tablet:scale-0 tablet:opacity-0"
            icon={<NextJsIcon />}
          >
            Next.js
          </Tag>
        </li>
        <li className="col-span-2 col-start-1 row-start-3 justify-self-center">
          <Tag
            className="tags tablet:translate-x-12 tablet:-translate-y-1 tablet:scale-0 tablet:opacity-0"
            style="text-blue-400"
            icon={<TypeScriptIcon />}
          >
            TypeScript
          </Tag>
        </li>
        <li className="col-span-2 col-start-3 row-start-2">
          <Tag
            className="tags tablet:-translate-x-10 tablet:translate-y-8 tablet:scale-0 tablet:opacity-0"
            style="text-sky-400!"
            icon={<ReactIcon />}
          >
            React.js
          </Tag>
        </li>
        <li className="col-span-2 col-start-3 row-start-4">
          <Tag
            className="tags tablet:-translate-x-10 tablet:-translate-y-8 tablet:scale-0 tablet:opacity-0"
            style="text-purple-500"
            icon={<ReduxIcon />}
          >
            Redux tookit
          </Tag>
        </li>
        <li className="col-span-3 col-start-1 row-start-5 justify-self-center">
          <Tag
            className="tags tablet:translate-x-8 tablet:-translate-y-16 tablet:scale-0 tablet:opacity-0"
            style="text-cyan-300"
            icon={<TailwindCSSIcon />}
          >
            Tailwind CSS
          </Tag>
        </li>
      </ul>
      <CircularShade className="size-24 tablet:size-44 desktop:size-58" />
    </div>
  );
}
