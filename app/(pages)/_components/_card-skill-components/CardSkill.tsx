import React from "react";
import { useRef } from "react";

export function Video({
  poster,
  children,
}: {
  poster: string;
  children: Readonly<React.ReactNode>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.style.cursor = "pointer";
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };
  return (
    <video
      ref={videoRef}
      className="tablet-portrait:max-w-80 aspect-video object-contain desktop:max-w-100 translate-z-0"
      muted
      playsInline
      poster={poster}
      preload="none"
      onClick={handleFullScreen}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      {children}
    </video>
  );
}
