import React from "react";
import { memo } from "react";

export const Video = memo(function Video({
  poster,
  children,
}: {
  poster: string;
  children: Readonly<React.ReactNode>;
}) {
  return (
    <video
      className="tablet-portrait:max-w-80 aspect-video object-contain desktop:max-w-100 translate-z-0"
      muted
      controls
      playsInline
      poster={poster}
      preload="none"
    >
      {children}
    </video>
  );
});
