"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

/**
 * Reusable nav links

 * For better code maintainance since both Header and Footer use this
 * @param param0 used as class styles
 * @param param1 used as class styles
 * @param param2 use to update parent state per anchor link click
 */
export default function NavLinks({
  ariaLabel,
  navStyle,
  anchorStyle,
  updateState,
}: {
  ariaLabel?: string;
  navStyle: string;
  anchorStyle?: string;
  updateState?: Dispatch<SetStateAction<boolean>> | undefined;
}) {
  const pathName = usePathname();
  const isFooter = navStyle.includes("footer"); // check if NavLinks is for footer

  return (
    <nav aria-label={ariaLabel}>
      <ul className={navStyle}>
        <li
          className={`relative ${pathName === "/" ? "active" : ""} ${isFooter ? "" : "enlarge"}`}
        >
          <Link
            className={`change-on-interaction ${anchorStyle}`}
            href="/"
            onClick={() => updateState?.(false)}
          >
            Home
          </Link>
        </li>
        <li
          className={`relative ${pathName === "/projects" ? "active" : ""} ${isFooter ? "" : "enlarge"}`}
        >
          <Link
            className={`change-on-interaction ${anchorStyle}`}
            href="/projects"
            onClick={() => updateState?.(false)}
          >
            Projects
          </Link>
        </li>
        <li
          className={`relative ${pathName === "/about" ? "active" : ""} ${isFooter ? "" : "enlarge"}`}
        >
          <Link
            className={`change-on-interaction ${anchorStyle}`}
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
