"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useRef } from "react";

/** Internal navigation links */
export default function NavLinks({
  navStyle,
  anchorStyle,
  updateState,
}: {
  navStyle: string;
  anchorStyle?: string;
  updateState?: Dispatch<SetStateAction<boolean>> | undefined;
}) {
  const pathName = usePathname();
  const isFooter = navStyle.includes("footer");
  const footerNavRef = useRef<HTMLElement | null>(null);

  return (
    <nav ref={footerNavRef}>
      <ul className={navStyle}>
        <li
          className={`relative ${pathName === "/" ? "active" : ""} ${isFooter ? "" : "enlarge"}`}
        >
          <Link
            className={anchorStyle}
            href="/"
            onClick={() => updateState?.(false)}
          >
            Home
          </Link>
        </li>
        <li
          className={`relative ${pathName === "/discover" ? "active" : ""} ${isFooter ? "" : "enlarge"}`}
        >
          <Link
            className={anchorStyle}
            href="/discover"
            onClick={() => updateState?.(false)}
          >
            Discover
          </Link>
        </li>
        <li
          className={`relative ${pathName === "/about" ? "active" : ""} ${isFooter ? "" : "enlarge"}`}
        >
          <Link
            className={anchorStyle}
            href="/about"
            onClick={() => updateState?.(false)}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
