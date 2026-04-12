import { gsap, ScrollTrigger } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";

/** Custom hook to handle GSAP animations on header when scrolling */
export default function useHeaderTransition() {
  useGSAP(() => {
    let isScrollingDown = true;
    const createHeaderAnimation = () => {
      const showHeaderAnim = gsap.to("#header", {
        yPercent: -100,
        duration: 0.5,
        paused: true,
        id: "showHeaderAnim",
      });
      ScrollTrigger.create({
        animation: showHeaderAnim,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          if (Math.abs(velocity) < 15) return;

          if (velocity < 0 && isScrollingDown) {
            isScrollingDown = false;
            showHeaderAnim.reverse();
          } else if (velocity > 0 && !isScrollingDown) {
            isScrollingDown = true;
            showHeaderAnim.play();
          }
        },
      });
    };

    createHeaderAnimation();
  });
}
