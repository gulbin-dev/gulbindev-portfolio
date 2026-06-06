// jest.setup.js

// 1. Fix for GSAP/ScrollTrigger matchMedia crashing in JSDOM environments
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Keep your existing setup imports below this line
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

jest.mock("next/navigation", () => ({
  useRouter() {
    return { prefetch: () => null, push: () => null, back: () => null };
  },
  usePathname() {
    return "";
  },
}));
