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
  title: "GulbinDev | Frontend React Web Developer Portfolio",
  description:
    "A web developer portfolio of Joshua Glenn R. Gulbin. A frontend react web developer focusing on building a maintainable, user-friendly, seo-friendly website.",
  authors: {
    name: "Joshua Glenn R. Gulbin",
    url: "https://www.linkedin.com/in/joshua-glenn-gulbin/",
  },

  creator: "Joshua Glenn R. Gulbin",
  applicationName: "GulbinDev Portfolio",
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  // Open Graph metadata
  openGraph: {
    title: "GulbinDev | Frontend React Web Developer Portfolio",
    description:
      "A web developer portfolio of Joshua Glenn R. Gulbin. A frontend react web developer focusing on building a maintainable, user-friendly, seo-friendly website.",
    url: "https://portfolio-gulbindev.vercel.app/",
    siteName: "GulbinDev Portfolio",
    type: "website",
    images: {
      url: "/og/website.jpg",
      width: 1200,
      height: 630,
      alt: "GulbinDev Portfolio",
    },
  },

  keywords: [
    "frontend",
    "react web developer",
    "frontend react web developer",
    "joshua glenn gulbin",
    "portfolio",
  ],
  verification: {
    google: "He5I8EQ2ZdNOVjUzs4yY2uBTt8VEpxebRCppfEiZJS8",
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
