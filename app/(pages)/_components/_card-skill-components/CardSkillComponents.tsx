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
    rootMargin: "300px 0px 0px 0px",
    triggerOnce: true,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current!.style.cursor = "pointer";
      playPromiseRef.current = videoRef.current.play();

      playPromiseRef.current.catch((e) => {
        console.error("Playback failed", e);
      });
    }
  };

  const handlePause = () => {
    if (videoRef.current && playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          videoRef.current?.pause();
        })
        .catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="min-h-20 tablet-portrait:min-h-45 desktop:min-h-56.25">
      <video
        ref={(el) => {
          videoRef.current = el;
          ref(el);
        }}
        className="tablet-portrait:max-w-80 aspect-video object-cover desktop:max-w-100 translate-z-0"
        muted
        playsInline
        poster={inView ? poster : ""}
        preload="none"
        onClick={handleFullScreen}
        onMouseEnter={handlePlay}
        onMouseLeave={handlePause}
      >
        {children}
      </video>
    </div>
  );
}
