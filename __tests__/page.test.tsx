import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";

// Import Page Route Components
import HomePage from "@/app/(pages)/page";
import AboutPage from "@/app/(pages)/(pages)/about/page";
import ProjectsPage from "@/app/(pages)/(pages)/projects/page";

// Setup global tracking mocks for the Next.js App Router components
const mockPush = vi.fn();

// Intercept Next.js Link, prevent navigation crash, and spread HTML attributes safely
vi.mock("next/link", () => ({
  default: function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a
        href={href}
        {...props}
        onClick={(e) => {
          e.preventDefault(); // Prevents "Not implemented: navigation" error
          mockPush(href); // Tracks the path requested by the link component
        }}
      >
        {children}
      </a>
    );
  },
}));

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
      forward: vi.fn(),
      back: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    };
  },
  usePathname() {
    return "/"; // Mock current base path
  },
}));

describe("Multi-Page Navigation Test", () => {
  beforeEach(() => {
    // Clear tracking data between independent tests
    mockPush.mockClear();
  });

  // Clear the DOM completely between tests to avoid element duplication
  afterEach(() => {
    cleanup();
  });

  // --- 1. TESTING NAVIGATION LINKS FROM THE HOME PAGE ---
  describe("Home Page Links", () => {
    test("navigates to projects from the home page link", async () => {
      render(<HomePage />);

      const projectsLink = screen.getByRole("link", {
        name: /check my work/i,
      });
      await userEvent.click(projectsLink);

      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith("/projects");
    });
  });

  // --- 2. TESTING CONTENT LAYOUT ON SPECIFIC TARGET PAGES ---
  describe("Target Pages Layout Content", () => {
    test("renders the About Page headings correctly", () => {
      render(<AboutPage />);

      const heading = screen.getByRole("heading", { name: /about/i });

      // Native Vitest assertion replacing .toBeInTheDocument()
      expect(heading).toBeTruthy();
    });

    test("renders the Projects Page layout elements", () => {
      render(<ProjectsPage />);

      const heading = screen.getByRole("heading", { name: /projects/i });

      // Native Vitest assertion replacing .toBeInTheDocument()
      expect(heading).toBeTruthy();
    });
  });
});
