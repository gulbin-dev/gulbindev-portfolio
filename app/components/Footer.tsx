import NavLinks from "./NavLinks";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="snap h-full bg-primary-color-darker w-full">
      <div className="max-w-180 place-self-center w-full px-3">
        <Link href="/" className="text-heading-md px-0! text-white">
          <Image src="/logo.svg" alt="logo" width={100} height={58} />
        </Link>
        <p className="mt-2">
          Frontend React Web developer focusing on building responsive,
          user-centered, seo friendly website and clean code space.
        </p>
        <nav>
          <ul>
            <li>Github</li>
            <li>Linkedin</li>
            <li>Email</li>
          </ul>
        </nav>
        <button>Download CV</button>

        <p>Quick Links</p>
        <NavLinks navStyle="flex flex-col gap-2" anchorStyle="underline" />

        <p>
          &copy; 2026 GulbinDev - Frontend React Web Developer. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
