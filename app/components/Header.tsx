"use client";
import { useEffect, useRef, useState } from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@utils/gsap";
import { usePathname } from "next/navigation";

const MenuSpan = ({ className }: { className?: string }) => {
  return (
    <span className={`menu-icon h-1 w-6 rounded-sm bg-cta ${className}`}></span>
  );
};

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "auto";
  }, [isMobileNavOpen]);

  // Header hide/show on scroll
  useGSAP(
    () => {
      ScrollTrigger.refresh();
      // hide header animation
      const showHeaderAnim = gsap
        .to(headerRef.current, {
          yPercent: -100,
          duration: 0.5,
          paused: true,
        })
        .progress(0);

      // hadles scroll animation
      ScrollTrigger.create({
        animation: showHeaderAnim,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          if (velocity < 0) {
            showHeaderAnim.reverse(); // display header on scroll up
          } else {
            showHeaderAnim.play(); // hide header on scroll down
          }
        },
      });
    },
    { dependencies: [pathName], revertOnUpdate: true, scope: headerRef },
  );

  // Hamburger + sidebar animation timeline
  useGSAP(
    () => {
      const slices = gsap.utils.toArray<HTMLElement>(".menu-icon");
      gsap.defaults({ ease: "power2.out", duration: 0.3 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(slices[0], { autoAlpha: 0, y: 10 })
        .to(slices[1], { rotate: 45, delay: 0.3 }, "<")
        .to(slices[2], { rotate: -45 }, "<")
        .to(slices[3], { autoAlpha: 0, y: -10 }, "<-=0.3")
        .fromTo(
          sideBarRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.5 },
          "<",
        );
    },
    { scope: headerRef },
  );

  // Play or reverse timeline based on nav state
  useGSAP(() => {
    if (isMobileNavOpen) tl.current?.play();
    else tl.current?.reverse();
  }, [isMobileNavOpen]);

  // Toggle handler
  const { contextSafe } = useGSAP(() => {}, { scope: sideBarRef });
  const toggleSideBarHandler = contextSafe(() =>
    setIsMobileNavOpen((prev) => !prev),
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed! top-0 left-0 z-50 min-h-12 w-full content-center bg-primary text-foreground-white tablet:min-h-9"
      >
        {/* ARIA page update */}
        <div role="status" className="sr-only">
          Navigated on
          {pathName === "/"
            ? " home "
            : pathName === "/projects"
              ? " projects "
              : pathName === "/about"
                ? " about "
                : pathName === "/privacy-notice"
                  ? " privacy notice "
                  : " terms and conditions "}
          page
        </div>

        <div className="flex h-full w-full max-w-180 items-center justify-between place-self-center px-3 py-3 tablet:py-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              aria-hidden
              width={100}
              height={58}
              loading="eager"
              className="aspect-auto"
            />
          </Link>
          <NavLinks
            ariaLabel="Header"
            navStyle="hidden header-nav gap-6 mr-8 tablet:flex"
          />
          <button
            onClick={toggleSideBarHandler}
            className="flex flex-col gap-1.5 tablet:hidden"
            aria-label="Navigation menu"
          >
            <MenuSpan />
            <span className="relative h-1 w-6">
              <MenuSpan className="absolute block origin-center" />
              <MenuSpan className="absolute block origin-center" />
            </span>
            <MenuSpan />
          </button>
        </div>
      </header>

      <div
        ref={sideBarRef}
        className="mobile-side-bar fixed top-0 left-0 z-10 h-screen w-full bg-primary py-15 text-foreground-white tablet:hidden"
        style={{ transform: "translateX(100%)" }}
      >
        <NavLinks
          navStyle="flex flex-col gap-2 items-end pr-3"
          anchorStyle="text-size-lg"
          updateState={setIsMobileNavOpen}
        />
      </div>
    </>
  );
}
