"use client";
import { useRef, ElementType } from "react";
import { gsap, useGSAP } from "@utils/gsap";
import { useInView } from "react-intersection-observer";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  children: React.ReactNode;
}

export default function HeaderLandmark({ children, level, id }: HeadingProps) {
  const HeaderLevel = `h${level}` as ElementType;

  const headerRef = useRef<HTMLHeadingElement | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 400px 0px",
    triggerOnce: true,
  });

  useGSAP(
    () => {
      if (!inView) return;
      gsap.defaults({
        ease: "expo.out",
        immediateRender: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mark-icon",
          start: "top center",
          end: "bottom+=100 center",
        },
      });

      tl.to(".header-text, .mark-icon", {
        x: 0,
      }).to(".mark-icon", {
        rotate: 0,
        ease: "expo.in",
      });
    },
    { dependencies: [inView], scope: headerRef },
  );

  return (
    <HeaderLevel
      ref={(el: HTMLHeadingElement | null) => {
        headerRef.current = el;
        ref(el);
      }}
      className="mb-3 flex items-center gap-1 overflow-hidden text-foreground-white"
      id={id}
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          id="Api-Fill--Streamline-Outlined-Fill-Material"
          height="24"
          width="24"
          className="mark-icon -translate-x-full rotate-45"
          aria-hidden="true"
        >
          <desc>Api Fill Streamline Icon: https://streamlinehq.com</desc>
          <path
            fill="#ee002e"
            d="M12 14.625 9.375 12 12 9.375 14.625 12 12 14.625Zm-2.125 -7.35L7.8 5.2 12 1l4.2 4.2 -2.075 2.075L12 5.15l-2.125 2.125ZM5.2 16.2 1 12l4.2 -4.2 2.075 2.075L5.15 12l2.125 2.125 -2.075 2.075Zm13.6 0 -2.075 -2.075L18.85 12l-2.125 -2.125 2.075 -2.075L23 12l-4.2 4.2ZM12 23l-4.2 -4.2 2.075 -2.075L12 18.85l2.125 -2.125 2.075 2.075L12 23Z"
            strokeWidth="0.5"
          ></path>
        </svg>
      </span>
      <span className="overflow-hidden">
        <span className="header-text block -translate-x-full">{children}</span>
      </span>
    </HeaderLevel>
  );
}
