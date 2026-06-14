import Link from "next/link";
import HeaderLandmark from "@components/UI/HeaderLandmark";
import PagesWrapper from "@components/PagesWrapper";

export default function TermsPage() {
  const sectionClassName = "w-full relative max-w-140 px-3 pb-8";
  return (
    <PagesWrapper>
      <section className={sectionClassName}>
        <HeaderLandmark level={1}>Terms and Conditions</HeaderLandmark>
        <p>
          Welcome to this website. This site&apos;s source code is distributed
          under the GNU General Public License version 3.0 (GPL-3.0). By using
          this site, you agree to the terms described here.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>
          License and Intellectual Property
        </HeaderLandmark>
        <p>
          The website&apos;s underlying source code and software framework are
          licensed under the{" "}
          <Link
            href="https://github.com/gogs/gogs/blob/main/conf/license/GNU%20General%20Public%20License%20v3.0"
            target="_blank"
            rel="noopener noreferrer"
            className="change-on-interaction text-cta underline hover:underline dark:text-blue-400"
          >
            GNU General Public License v3.0
          </Link>
          . Per the sub-licensing permissions granted by the permissive{" "}
          <Link
            href="https://docs.tabler.io/ui/getting-started/license"
            target="_blank"
            rel="noopener noreferrer"
            className="change-on-interaction text-cta underline hover:underline dark:text-blue-400"
          >
            MIT License
          </Link>
          , this includes integrated code and assets from{" "}
          <strong>Tabler Icons</strong>. You are free to copy, distribute, and
          modify this combined code base, provided all derivative works are also
          licensed under GPL-3.0 and include the same license terms.
        </p>
        <p className="mt-4">
          This open-source license <strong>does not apply</strong> to the
          following assets:
        </p>
        <ul className="mt-3 mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Streamline Icons:</strong> Subject strictly to their
            respective{" "}
            <Link
              href="https://help.streamlinehq.com/en/articles/5354376-streamline-free-license"
              target="_blank"
              rel="noopener noreferrer"
              className="change-on-interaction text-cta underline hover:underline dark:text-blue-400"
            >
              Streamline License Agreements
            </Link>
            . These proprietary icons are protected by commercial terms, require
            visible attribution across the site (provided via our global website
            footer), and may not be extracted, redistributed, or sub-licensed
            under any open-source framework.
          </li>
        </ul>
        <p>
          All written text copy, proprietary branding, and custom UI design
          graphics remain the intellectual property of the site owner and are
          protected by standard copyright laws.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Warranty Disclaimer</HeaderLandmark>
        <p>
          This website is provided &quot;as is&quot;, without warranty of any
          kind. The owner accepts no liability for any damages or losses arising
          from the use of this website or any linked materials.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Use of the Website</HeaderLandmark>
        <p>
          You may use the website for lawful purposes only. Unauthorized access,
          reproduction, or modification of the website assets and content beyond
          what is allowed by their respective licensing terms is prohibited.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Analytics and Data</HeaderLandmark>
        <p>
          This website does not collect personal data from visitors. The only
          analytics used are Vercel&apos;s built-in analytics and Google Search
          Console reports for monitoring site performance and search indexing.
          These services are used only to improve the website and do not involve
          direct user tracking beyond standard access logs.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>Updates</HeaderLandmark>
        <p>
          The site owner may revise these terms at any time. Continued use of
          the website after any changes constitutes acceptance of the updated
          terms.
        </p>
      </section>
    </PagesWrapper>
  );
}
