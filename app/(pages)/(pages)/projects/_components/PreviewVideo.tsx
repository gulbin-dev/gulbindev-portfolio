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
      "https://d2kkupsaj7vt9n9k.public.blob.vercel-storage.com/" + folder,
    videoPath = folder === "gulbindev-portfolio" ? "preview-1" : "preview";
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
    <video
      ref={videoRef}
      className="relative z-3 row-start-1 aspect-video w-full justify-self-center overflow-hidden object-contain desktop:min-h-33.75 desktop:max-w-60 desktop:rounded-none"
      muted
      preload="none"
      poster={`${url}/poster.png`}
      playsInline
      width="100%"
      height="auto"
      onClick={handleFullScreen}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      <source src={`${url}/${videoPath}.webm`} type="video/webm" />
      <source src={`${url}/${videoPath}.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
