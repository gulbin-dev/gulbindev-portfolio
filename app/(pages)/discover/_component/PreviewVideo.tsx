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
  const url =
    "https://d2kkupsaj7vt9n9k.public.blob.vercel-storage.com/" + folder;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <video
      ref={videoRef}
      className="tablet-portrait:max-w-80 desktop:max-w-100"
      muted
      preload="metadata"
      playsInline
      width={400}
      height={225}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      <source src={`${url}/preview.webm`} type="video/webm" />
      <source src={`${url}/preview.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
