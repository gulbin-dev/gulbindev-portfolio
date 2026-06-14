"use client";

import {
  HTMLIcon,
  CSSIcon,
  JavascriptIcon,
  GitIcon,
  GithubIcon,
} from "@utils/tabler-icons";
import Tag from "@components/UI/Tag";
import CircularShade from "@components/UI/CircularShade";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import useAnimateStacks from "@/app/hooks/useAnimateStacks";

export default function CoreStacks() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "500px 0px 0px 0px",
    triggerOnce: true,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  useAnimateStacks({ inView: inView, containerRef: containerRef });
  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="relative col-start-5 col-end-9 row-span-full row-start-1 grid grid-cols-subgrid grid-rows-subgrid desktop:col-start-7 desktop:col-end-11"
    >
      <ul
        aria-label="Core stacks"
        className="relative z-1 col-span-full col-start-1 row-span-full row-start-1 mt-3 mb-9 flex grid-cols-subgrid grid-rows-subgrid flex-wrap gap-x-1.5 gap-y-2.5 tablet:grid"
      >
        <li className="col-span-2 col-start-2 row-start-1">
          <Tag
            className="tags tablet:translate-8 tablet:scale-0 tablet:opacity-0"
            style="text-orange-500"
            icon={<HTMLIcon />}
          >
            HTML5
          </Tag>
        </li>
        <li className="col-span-2 col-start-3 row-span-2 row-start-2 justify-self-center">
          <Tag
            className="tags tablet:-translate-x-5 tablet:translate-y-3 tablet:scale-0 tablet:opacity-0"
            style="text-blue-600"
            icon={<CSSIcon />}
          >
            CSS3
          </Tag>
        </li>
        <li className="col-span-2 col-start-1 row-span-2 row-start-2 place-self-center">
          <Tag
            className="tags tablet:translate-x-16 tablet:scale-0 tablet:opacity-0"
            style="text-yellow-300"
            icon={<JavascriptIcon />}
          >
            JavaScript
          </Tag>
        </li>
        <li className="col-span-2 col-start-2 row-span-2 row-start-4">
          <Tag
            className="tags tablet:translate-x-8 tablet:-translate-y-6 tablet:scale-0 tablet:opacity-0"
            style="text-orange-600"
            icon={<GitIcon />}
          >
            Git
          </Tag>
        </li>

        <li className="col-span-2 col-start-3 row-span-2 row-start-3 place-self-center">
          <Tag
            className="tags tablet:-translate-x-10 tablet:-translate-y-4 tablet:scale-0 tablet:opacity-0"
            style="text-indigo-600"
            icon={<GithubIcon />}
          >
            Github
          </Tag>
        </li>
      </ul>
      <CircularShade className="size-20 tablet:size-34 desktop:size-46" />
    </div>
  );
}
