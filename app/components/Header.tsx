"use client";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@utils/gsap";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileNavOpen]);

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
  }, []);

  return (
    <>
      <header
        id="header"
        className="fixed! z-50 left-0 top-0 w-full min-h-12 content-center  tablet-portrait:min-h-9 bg-secondary-color "
      >
        <div className="max-w-180 w-full h-full flex justify-between items-center place-self-center px-3 py-3 tablet-portrait:py-0">
          <Link href="/" className="px-0 text-white">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={58}
              loading="eager"
              className="aspect-auto"
            />
          </Link>
          <NavLinks navStyle="hidden header-nav gap-6 mr-8 tablet-portrait:flex" />
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="flex flex-col gap-1 tablet-portrait:hidden"
            aria-label="Navigation menu"
          >
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
          </button>
        </div>
      </header>
      {isMobileNavOpen && (
        <div className="bg-primary-color-darker w-full h-screen sticky top-0 left-0 z-10 py-15">
          <NavLinks
            navStyle="flex flex-col gap-2 items-end pr-3"
            anchorStyle="text-size-lg"
            updateState={setIsMobileNavOpen}
          />
        </div>
      )}
    </>
  );
}
