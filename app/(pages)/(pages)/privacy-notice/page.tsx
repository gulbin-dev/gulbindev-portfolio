import Link from "next/link";
import HeaderLandmark from "@components/UI/HeaderLandmark";
import PagesWrapper from "@components/PagesWrapper";

export default function PrivacyPage() {
  const sectionClassName = "w-full relative max-w-140 px-3 pb-8";
  return (
    <PagesWrapper>
      <section className={sectionClassName}>
        <HeaderLandmark level={1}>Privacy Notice</HeaderLandmark>
        <p>
          This website is designed with user privacy in mind. No personal data
          is collected or sold through this site.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Data Collection</HeaderLandmark>
        <p>
          The site does not collect personal information such as names, email
          addresses, payment details, or user profiles. There are no contact
          forms or registration systems that gather visitor data.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Analytics</HeaderLandmark>
        <p>
          The website uses Vercel&apos;s built-in analytics and Google Search
          Console analytics for basic performance monitoring and search indexing
          insights. These analytics are used only to improve the website and do
          not involve direct personal data collection from visitors.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Cookies and Tracking</HeaderLandmark>
        <p>
          No third-party tracking cookies are intentionally placed by this site.
          Any analytics data are handled by the platform providers and are
          limited to aggregate performance metrics.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>License Notice</HeaderLandmark>
        <p>
          The underlying source code of this website is licensed under the GNU
          General Public License version 3.0 (GPL-3.0). This open-source
          copyleft framework applies to the code base, but does not extend to
          proprietary third-party design assets used on this site. For
          comprehensive licensing rules and third-party asset exclusions, please
          review our full{" "}
          <Link
            href="/terms-and-conditions"
            className="change-on-interaction text-cta underline hover:underline dark:text-blue-400"
          >
            Terms and Conditions
          </Link>
          .
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Contact</HeaderLandmark>
        <p>
          If you have questions about this privacy notice, please refer to the
          repository or project owner information available alongside this
          website.
        </p>
      </section>
    </PagesWrapper>
  );
}
