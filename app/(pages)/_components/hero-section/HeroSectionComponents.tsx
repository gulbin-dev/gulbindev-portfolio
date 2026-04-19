import { useLoading } from "@/app/utils/LoadingContext";
import { useHeroImageSequence } from "@/app/hooks/home-page-gsap/useHeroSectionGSAP";
export const Canvas = () => {
  const { isRevealed } = useLoading();
  useHeroImageSequence(isRevealed);
  return (
    <canvas
      id="hero-canvas"
      className="absolute top-25 tablet:top-15 left-3 tablet:bottom-0"
      data-speed="0.5"
    ></canvas>
  );
};
