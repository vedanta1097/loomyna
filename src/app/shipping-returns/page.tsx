import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());

  return {
    title: dictionary.policies.metadataTitle,
    description: dictionary.policies.metadataDescription,
    alternates: { canonical: "/shipping-returns" },
    openGraph: {
      type: "website",
      url: "/shipping-returns",
      title: dictionary.policies.metadataTitle,
      description: dictionary.policies.metadataDescription,
    },
  };
}

export default async function ShippingReturnsPage() {
  const dictionary = getDictionary(await getLocale());
  const policies = dictionary.policies;

  return (
    <>
      <nav className="breadcrumbs shell" aria-label={dictionary.productPage.breadcrumbLabel}>
        <Link href="/">{dictionary.productPage.home}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{policies.metadataTitle}</span>
      </nav>
      <article className="policy-page shell">
        <header className="page-heading policy-heading">
          <p className="eyebrow">{policies.eyebrow}</p>
          <h1>{policies.title}</h1>
          <p>{policies.introduction}</p>
        </header>

        <div className="policy-sections">
          <section className="policy-section mood-blue">
            <p className="eyebrow">01</p>
            <h2>{policies.shippingTitle}</h2>
            <PolicyItem title={policies.shippingBaliTitle}>{policies.shippingBali}</PolicyItem>
            <PolicyItem title={policies.shippingIndonesiaTitle}>
              {policies.shippingIndonesia}
            </PolicyItem>
            <PolicyItem title={policies.shippingTimingTitle}>{policies.shippingTiming}</PolicyItem>
            <PolicyItem title={policies.trackingTitle}>{policies.tracking}</PolicyItem>
          </section>

          <section className="policy-section mood-yellow">
            <p className="eyebrow">02</p>
            <h2>{policies.returnsTitle}</h2>
            <PolicyItem title={policies.returnWindowTitle}>{policies.returnWindow}</PolicyItem>
            <PolicyItem title={policies.returnConditionsTitle}>{policies.returnConditions}</PolicyItem>
            <PolicyItem title={policies.returnRequestTitle}>{policies.returnRequest}</PolicyItem>
            <PolicyItem title={policies.approvalTitle}>{policies.approval}</PolicyItem>
          </section>
        </div>

        <section className="policy-contact">
          <div>
            <p className="eyebrow">{policies.eyebrow}</p>
            <h2>{policies.questionsTitle}</h2>
            <p>{policies.questionsDescription}</p>
          </div>
          <div className="policy-contact-links">
            <a
              className="button button-primary"
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              {policies.whatsapp}
            </a>
            <a className="text-link" href={`mailto:${siteConfig.email}`}>
              {policies.email} <span>→</span>
            </a>
          </div>
        </section>
      </article>
    </>
  );
}

function PolicyItem({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="policy-item">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
