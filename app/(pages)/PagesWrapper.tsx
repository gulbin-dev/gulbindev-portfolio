"use client";

import useGlobalGSAP from "@hooks/useGlobalGSAP";
import React from "react";
export default function PagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useGlobalGSAP();
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
