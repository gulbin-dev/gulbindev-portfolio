import React from "react";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

export function Video({
  poster,
  children,
}: {
  poster: string;
  children: Readonly<React.ReactNode>;
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const video = useRef<HTMLVideoElement>(null);

  const setRef = (element: HTMLVideoElement) => {
    video.current = element;
    ref(element);
  };

  const handlePlay = () => {
    if (inView && video.current) {
      video.current.play().catch((e) => console.error("Playback failed", e));
      video.current.style.cursor = "pointer";
      video.current.play();
    }
  };

  const handlePause = () => {
    if (video.current) {
      video.current.pause();
    }
  };

  const handleFullScreen = () => {
    if (video.current) {
      video.current.requestFullscreen();
    }
  };

  return (
    <video
      ref={setRef}
      className="tablet-portrait:max-w-80 aspect-video object-cover desktop:max-w-100 translate-z-0"
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
