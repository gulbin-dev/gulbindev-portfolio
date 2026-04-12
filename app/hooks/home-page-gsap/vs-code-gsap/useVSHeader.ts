import { useGSAP } from "@gsap/react";
import { gsap, mediaQueries } from "@utils/gsap/gsap";
export default function useVSHeader(windowSize: number) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        () => {
          const skewVSCodeHeader = gsap.quickTo(".vs-code-header", "skewY");
          const yVSCodeHeader = gsap.quickTo(".vs-code-header", "y");
          const clampSkew = gsap.utils.clamp(-4, 4);
          const clampYVSCode = gsap.utils.clamp(-20, 20);

          gsap.to(".vs-code-header", {
            scrollTrigger: {
              trigger: ".vs-code-header",
              start: "top 100%",
              onUpdate: (self) => {
                skewVSCodeHeader(clampSkew(self.getVelocity() / 2));
                yVSCodeHeader(clampYVSCode(self.getVelocity() / 50));
              },
            },
          });
        },
      );
    },
    { dependencies: [windowSize], revertOnUpdate: true },
  );
}
