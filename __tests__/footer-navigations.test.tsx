import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeAll,
  beforeEach,
  afterEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import Footer from "@components/Footer";

// 1. Fix GSAP and Web API environment crashes by stubbing out window methods
beforeAll(() => {
  window.scrollTo = vi.fn();

  // Mock IntersectionObserver for react-intersection-observer
  class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

// Setup global tracking mocks for the Next.js App Router
const mockPush = vi.fn();

// 2. Intercept Next.js Link, prevent navigation crash, AND spread all HTML attributes
vi.mock("next/link", () => {
  return {
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
            e.preventDefault();
            mockPush(href);
          }}
        >
          {children}
        </a>
      );
    },
  };
});

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
    return "/";
  },
}));

describe("Footer navigation test", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  // 3. Clear the DOM completely between tests to avoid element duplication
  afterEach(() => {
    cleanup();
  });

  test("Navigate to GitHub profile", async () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", {
      name: /visit my github profile/i,
    });

    // Native Vitest DOM attribute assertion
    expect(githubLink.getAttribute("href")).toBe(
      "https://github.com/gulbin-dev",
    );

    await userEvent.click(githubLink);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("https://github.com/gulbin-dev");
  });

  test("Navigate to Linkedin profile", async () => {
    render(<Footer />);

    const linkedinLink = screen.getByRole("link", {
      name: /let's connect on linkedin/i,
    });

    // Native Vitest DOM attribute assertion
    expect(linkedinLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/joshua-glenn-gulbin/",
    );

    await userEvent.click(linkedinLink);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      "https://www.linkedin.com/in/joshua-glenn-gulbin/",
    );
  });
});
