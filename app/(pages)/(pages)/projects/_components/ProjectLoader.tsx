import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export default function ProjectLoader() {
  return (
    <SkeletonTheme baseColor="#c2c1c0" highlightColor="#858585">
      <div className="relative flex max-h-138 flex-col justify-center gap-2 overflow-hidden py-6 tablet:max-h-74 tablet:max-w-110 tablet:flex-row desktop:max-h-[655.99px] desktop:gap-4">
        <div className="flex w-full flex-col gap-1.5 p-3">
          <Skeleton className="aspect-video" width="100%" />
          <Skeleton className="my-2" width="35%" height="32px" />
          <Skeleton width="85%" />
          <Skeleton width="100%" />
          <Skeleton width="55%" />
          <div className="mt-4 flex gap-5">
            <Skeleton width="75px" height="44px" />
            <Skeleton width="75px" height="44px" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-1.5 p-3">
          <Skeleton className="aspect-video" width="100%" />
          <Skeleton className="my-2" width="45%" height="32px" />
          <Skeleton width="85%" />
          <Skeleton width="100%" />
          <Skeleton width="55%" />
          <div className="mt-4 flex gap-5">
            <Skeleton width="75px" height="44px" />
            <Skeleton width="75px" height="44px" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
