import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";
import { Poppins, Roboto } from "next/font/google";

import PagesWrapper from "@components/PagesWrapper";
import FooterWrapper from "@components/FooterWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-gulbindev.vercel.app"),
  title: "Joshua Glenn Gulbin | Frontend React Web Developer",
  description:
    "Portfolio of Joshua Glenn Gulbin (GulbinDev). A Frontend Developer specializing in React, Next.js, TypeScript, Tailwind CSS, and user-friendly UI design.",
  authors: {
    name: "Joshua Glenn R. Gulbin",
    url: "https://www.linkedin.com/in/joshua-glenn-gulbin/",
  },

  creator: "Joshua Glenn R. Gulbin",
  applicationName: "Joshua Glenn Gulbin | Frontend React Web Developer",
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",

  openGraph: {
    title: "Joshua Glenn Gulbin | Frontend React Web Developer",
    description:
      "Portfolio of Joshua Glenn Gulbin (GulbinDev). A Frontend Developer specializing in React, Next.js, TypeScript, Tailwind CSS, and user-friendly UI design.",
    url: "https://portfolio-gulbindev.vercel.app/",
    siteName: "Joshua Glenn Gulbin | Frontend React Web Developer",
    type: "website",
    images: {
      url: "/og/website.jpg",
      width: 1200,
      height: 630,
      alt: "Joshua Glenn Gulbin | Frontend React Web Developer",
    },
  },

  verification: {
    google: "KsgDFoZLb80qI6Hqcm1B1BDkNzJyutg-LLhi2XjwuXw",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lato",
  fallback: ["Arial"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-open-sans",
  fallback: ["sans serif"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} `}>
      <body>
        <SpeedInsights />
        <Analytics />

        <Header />
        <PagesWrapper>
          {children}
          <FooterWrapper />
        </PagesWrapper>
      </body>
    </html>
  );
}
