"use client";
import { gsap, SplitText } from "./gsap";
export default function vsCodeSectionGSAP(context: gsap.Context) {
  const { reduceMotion } = context.conditions ?? {};
  const codeBlocks: HTMLElement[] = gsap.utils.toArray(".code-snippet");
  document.fonts.ready.then(() => {
    const issueText = SplitText.create("#issue", {
      type: "chars",
      autoSplit: true,
    });
    gsap.from(issueText.chars, {
      autoAlpha: 0,
      scale: 2.5,
      ease: reduceMotion ? "none" : "power4.in",
      stagger: {
        amount: 0.5,
        from: "start",
      },
      scrollTrigger: {
        trigger: "#issue",
        start: "top 65%",
      },
      onComplete: () => issueText.revert(),
    });
    codeBlocks.forEach((codeBlock) => {
      const lines: HTMLElement[] = gsap.utils.toArray("p", codeBlock);
      lines.forEach((line, index) => {
        SplitText.create(line, {
          type: "chars",
          autoSplit: true,
          onSplit: (self) => {
            return gsap.from(self.chars, {
              autoAlpha: 0,
              scale: reduceMotion ? 1 : 1.5,
              ease: reduceMotion ? "none" : "power4.in",
              stagger: {
                amount: 0.5,
                from: "start",
              },
              scrollTrigger: {
                trigger: self.chars[index],
                start: "top 80%",
                end: "max",
              },
              onComplete: () => self.revert(),
            });
          },
        });
      });
    });
  });
}
