import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProjectLoader() {
  return (
    <div className="flex flex-col gap-4 max-w-180 tablet-portrait:w-[90vw] justify-self-center py-5">
      <div className="grid grid-cols-[auto_1fr] gap-5 rounded-xl border p-4">
        <Skeleton count={1} width={400} height={225} className="mb-4" />
        <div>
          <Skeleton count={1} className="text-size-lg mb-4" />
          <Skeleton count={3} className="text-base" />
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-5 rounded-xl border p-4">
        <Skeleton count={1} width={400} height={225} className="mb-4" />
        <div>
          <Skeleton count={1} className="text-size-lg mb-4" />
          <Skeleton count={3} className="text-base" />
        </div>
      </div>
    </div>
  );
}
