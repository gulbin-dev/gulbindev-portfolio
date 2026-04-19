import React from "react";

export const Video = ({
  poster,
  children,
}: {
  poster: string;
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <video
      className="tablet:max-w-80 aspect-video desktop:max-w-100"
      muted
      controls
      poster={poster}
      width={"100%"}
      height={"auto"}
      preload="metadata"
    >
      {children}
    </video>
  );
};
