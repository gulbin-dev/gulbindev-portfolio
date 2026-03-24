"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
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
  function handleStateUpdate() {
    if (updateState !== undefined) {
      const prev = updateState;
      updateState(!prev);
    }
  }
  return (
    <nav>
      <ul className={navStyle}>
        <li>
          <Link
            className={anchorStyle}
            href={pathName === "/#home-top" ? "#home-top" : "/#home-top"}
            onClick={handleStateUpdate}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={anchorStyle}
            href={
              pathName === "/discover#discover-top"
                ? "#discover-top"
                : "/discover#discover-top"
            }
            onClick={handleStateUpdate}
          >
            Discover
          </Link>
        </li>
        <li>
          <Link
            className={anchorStyle}
            href={
              pathName === "/about#about-top"
                ? "#about-top"
                : "/about#about-top"
            }
            onClick={handleStateUpdate}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
