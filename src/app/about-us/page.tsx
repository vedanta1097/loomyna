import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());

  return {
    title: dictionary.about.metadataTitle,
    description: dictionary.about.metadataDescription,
    alternates: { canonical: "/about-us" },
    openGraph: {
      type: "website",
      url: "/about-us",
      title: dictionary.about.metadataTitle,
      description: dictionary.about.metadataDescription,
      images: ["/assets/banners/desktop/og-image.jpg"],
    },
  };
}

export default async function AboutPage() {
  const dictionary = getDictionary(await getLocale());

  return (
    <>
      <nav
        className="breadcrumbs shell"
        aria-label={dictionary.productPage.breadcrumbLabel}
      >
        <Link href="/">{dictionary.productPage.home}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{dictionary.about.eyebrow}</span>
      </nav>
      <article className="about-page shell">
        <header className="about-hero">
          <div className="about-intro">
            <p className="eyebrow">{dictionary.about.eyebrow}</p>
            <h1>{dictionary.about.title}</h1>
            <p>{dictionary.about.introduction}</p>
          </div>
          <div className="about-image">
            <Image
              src="/assets/banners/desktop/hero-banner-desktop-v2.jpg"
              alt={dictionary.home.heroAlt}
              fill
              preload
              sizes="(max-width: 899px) 100vw, 55vw"
            />
          </div>
        </header>

        <section className="about-story">
          <div className="about-story-card mood-blue">
            <span aria-hidden="true">✦</span>
            <h2>{dictionary.about.storyTitle}</h2>
            <p>{dictionary.about.story}</p>
          </div>
          <div className="about-story-card mood-yellow">
            <span aria-hidden="true">☀</span>
            <h2>{dictionary.about.versatilityTitle}</h2>
            <p>{dictionary.about.versatility}</p>
          </div>
        </section>

        <section className="about-contact">
          <div>
            <p className="eyebrow">{dictionary.about.contactEyebrow}</p>
            <h2>{dictionary.about.contactTitle}</h2>
            <p>{dictionary.about.contactDescription}</p>
          </div>
          <div className="about-contact-links">
            <a
              className="button button-primary"
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.about.whatsapp}
            </a>
            <a className="text-link" href={`mailto:${siteConfig.email}`}>
              {dictionary.about.email} <span>→</span>
            </a>
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.label}
                className="text-link"
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label} <span>↗</span>
              </a>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
