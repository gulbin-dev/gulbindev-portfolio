import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProjectLoader() {
  return <Skeleton count={2} height={100} className="mb-4" />;
}
