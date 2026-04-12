"use client";
import React from "react";

import useSmoothScroll from "@hooks/useSmoothScroll";
import useWindowSizeListener from "../hooks/useWindowSizeListener";
/**
 * A wrapper component that helps implement the SmoothScroll from GSAP.
 * This component will render a div with an id of "smooth-wrapper" and
 * another div with an id of "smooth-content" inside it. The content
 * of the wrapped component will be rendered inside the "smooth-content"
 * div.
 */
export default function PagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const windowSize = useWindowSizeListener();
  useSmoothScroll(windowSize);
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="bg-primary-color-darker">
        {children}
      </div>
    </div>
  );
}
