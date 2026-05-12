"use client";
import { useRef } from "react";

/**
 *
 * @param folder - folder path name
 * @returns video element for preview UI
 */
export default function PreviewVideo({
  folder,
}: Readonly<{
  folder: string;
}>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const url =
    "https://d2kkupsaj7vt9n9k.public.blob.vercel-storage.com/" + folder;

  const handlePlay = () => {
    if (videoRef.current) {
      playPromiseRef.current = videoRef.current.play();

      playPromiseRef.current
        .then(() => {
          videoRef.current!.style.cursor = "pointer";
        })
        .catch((e) => {
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
    <div className="tablet-portrait:min-h-50 desktop:min-h-33.75">
      <video
        ref={videoRef}
        className="aspect-video object-cover justify-self-center tablet-portrait:rounded-t-xl  desktop:max-w-60 desktop:rounded-none"
        muted
        preload="metadata"
        poster={`/project-video-poster/${folder}/poster.png`}
        playsInline
        width="100%"
        height={225}
        onClick={handleFullScreen}
        onMouseEnter={handlePlay}
        onMouseLeave={handlePause}
      >
        <source src={`${url}/preview.webm`} type="video/webm" />
        <source src={`${url}/preview.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
