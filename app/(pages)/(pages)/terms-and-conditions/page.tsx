import HeaderLandmark from "@components/UI/HeaderLandmark";
import PagesWrapper from "@components/PagesWrapper";

export default function TermsPage() {
  const sectionClassName = "w-full  relative max-w-140 px-3 pb-8";
  return (
    <PagesWrapper>
      <section className={sectionClassName}>
        <HeaderLandmark level={1}>Terms and Conditions</HeaderLandmark>
        <p>
          Welcome to this website. This site is distributed under the GNU
          General Public License version 3.0 (GPL-3.0). By using this site, you
          agree to the terms described here.
        </p>
      </section>

      <section className={sectionClassName}>
        <HeaderLandmark level={2}>License</HeaderLandmark>
        <p>
          All website content, source code, and related materials are licensed
          under the GNU General Public License v3.0. You are free to copy,
          distribute, and modify the work, as long as all derivative works are
          also licensed under GPL-3.0 and include the same license terms.
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
          reproduction, or modification of the website content beyond what is
          allowed by the GPL-3.0 license is prohibited.
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
