"use client";

import dynamic from "next/dynamic";

// dynamically import footer component to reduce Commulative Layout Shift (CLS)
const Footer = dynamic(() => import("@components/Footer"), { ssr: false });

/**
 * A Wrapper client component to dynamically import footer component on client side
 * @returns Footer
 */
export default function FooterWrapper() {
  return <Footer />;
}
