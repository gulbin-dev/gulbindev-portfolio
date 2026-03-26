"use client";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
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
  return (
    <>
      <header
        id="header"
        className="fixed! z-100 left-0 top-0! w-full  max-h-12 tablet:max-h-9 bg-secondary-color "
      >
        <div className="max-w-180 w-full h-full flex justify-between items-center place-self-center px-3 py-3">
          <Link href="/" className="text-heading-xl px-0! text-white">
            GulbinDev
          </Link>
          <NavLinks navStyle="hidden tablet:flex gap-6" />
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="flex flex-col gap-1  tablet:hidden"
          >
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
          </button>
        </div>
      </header>
      {isMobileNavOpen && (
        <div className="bg-primary-color-darker w-full h-screen relative top-0 left-0 z-10 py-15">
          <NavLinks
            navStyle="flex flex-col gap-2 items-end pr-3"
            anchorStyle="text-heading-lg"
            updateState={setIsMobileNavOpen}
          />
        </div>
      )}
    </>
  );
}
