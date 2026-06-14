"use client";
import { useRef, ElementType } from "react";
import { gsap, useGSAP } from "@utils/gsap";
import { useInView } from "react-intersection-observer";
import { APIFillIcon } from "@utils/tabler-icons";

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
        <APIFillIcon />
      </span>
      <span className="overflow-hidden">
        <span className="header-text block -translate-x-full">{children}</span>
      </span>
    </HeaderLevel>
  );
}
