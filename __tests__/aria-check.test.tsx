// __tests__/all-pages-accessibility.test.tsx
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";

// Import Global Layout Components
import Header from "@components/Header";
import Footer from "@components/Footer";

// Import Page Route Components
import HomePage from "@/app/(pages)/page";
import AboutPage from "@/app/(pages)/(pages)/about/page";
import ProjectsPage from "@/app/(pages)/(pages)/projects/page";
import PrivacyPage from "@/app/(pages)/(pages)/privacy-notice/page";
import TermsPage from "@/app/(pages)/(pages)/terms-and-conditions/page";

// 1. Structure your routes into a scannable dictionary array
const routesToTest = [
  { route: "/", component: <HomePage /> },
  { route: "/about", component: <AboutPage /> },
  { route: "/projects", component: <ProjectsPage /> },
  { route: "/privacy-notice", component: <PrivacyPage /> },
  { route: "/terms-and-conditions", component: <TermsPage /> },
];

describe("Global Layout & Page App Router ARIA Scans", () => {
  routesToTest.forEach(({ route, component }) => {
    it(`should find zero ARIA violations on "${route}" when loaded with Header and Footer`, async () => {
      let container: HTMLElement;

      // 2. Wrap the route component with the global Header and Footer structural tags
      await act(async () => {
        const rendered = render(
          <>
            <Header />
            <main id="main-content">{component}</main>
            <Footer />
          </>,
        );
        container = rendered.container;
      });

      // 3. Execute the full-page accessibility audit
      const results = await axe(container!);

      // 4. Assert full structural and landmark compliance
      expect(results).toHaveNoViolations();
    });
  });
});
