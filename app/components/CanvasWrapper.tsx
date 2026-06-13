"use client";

import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@components/UI/Canvas"), {
  ssr: false,
});
export default function CanvasWrapper({ className }: { className: string }) {
  return <Canvas className={className} />;
}
