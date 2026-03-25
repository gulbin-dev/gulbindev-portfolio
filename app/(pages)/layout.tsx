import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";
import { Poppins, Roboto } from "next/font/google";
import Footer from "@components/Footer";
import PagesWrapper from "./PagesWrapper";
export const metadata: Metadata = {
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
    type: "website",
    title: "GulbinDev | Frontend React Web Developer Portfolio",
    description:
      "A web developer portfolio of Joshua Glenn R. Gulbin. A frontend react web developer focusing on building a maintainable, user-friendly, seo-friendly website.",
    url: "https://www.gulbindev.com",
    siteName: "GulbinDev Portfolio",
  },

  keywords: [
    "frontend",
    "react web developer",
    "frontend react web developer",
    "joshua glenn gulbin",
    "portfolio",
  ],
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

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} `}>
      <body>
        <Header />
        <PagesWrapper>
          {children}
          <Footer />
        </PagesWrapper>
      </body>
    </html>
  );
}
