import React from "react";

export default function Video({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <video
      className="tablet:max-w-80 desktop:max-w-100"
      autoPlay
      muted
      controls
    >
      {children}
    </video>
  );
}
