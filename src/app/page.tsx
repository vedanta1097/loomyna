import type { Metadata } from "next";
import Link from "next/link";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { heroSlides, homeSections } from "@/config/home";
import { siteConfig } from "@/config/site";
import { getPublishedProducts } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());

  return {
    title: { absolute: dictionary.metadata.title },
    description: dictionary.metadata.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      siteName: siteConfig.name,
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: ["/assets/banners/desktop/og-image.jpg"],
    },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const publishedProducts = getPublishedProducts(locale);
  const localizedSlides = heroSlides.map((slide) => ({
    ...slide,
    imageAlt: dictionary.home.heroAlt,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: "Loomyna Bali",
      },
      {
        "@type": "OnlineStore",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/assets/brand/logo.svg`,
        description: dictionary.metadata.description,
        email: siteConfig.email,
        telephone: `+${siteConfig.whatsappNumber}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Denpasar",
          addressRegion: "Bali",
          addressCountry: "ID",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: siteConfig.email,
          telephone: `+${siteConfig.whatsappNumber}`,
          availableLanguage: ["Indonesian", "English"],
        },
        hasShippingService: {
          "@type": "ShippingService",
          name: "Indonesia standard shipping",
          description:
            "Bali orders are delivered by Gojek, Grab, or another ride-hailing service. Orders outside Bali are sent by JNE or another shipping company. Confirmed orders ship on the next business day and domestic delivery usually takes 5–7 business days.",
          fulfillmentType: "https://schema.org/FulfillmentTypeDelivery",
          handlingTime: {
            "@type": "ServicePeriod",
            duration: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 1,
              unitCode: "DAY",
            },
          },
          shippingConditions: {
            "@type": "ShippingConditions",
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "ID",
            },
            transitTime: {
              "@type": "ServicePeriod",
              duration: {
                "@type": "QuantitativeValue",
                minValue: 5,
                maxValue: 7,
                unitCode: "DAY",
              },
            },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "ID",
          returnPolicyCountry: "ID",
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 14,
          returnMethod: "https://schema.org/ReturnByMail",
          merchantReturnLink: `${siteConfig.url}/shipping-returns`,
        },
        sameAs: siteConfig.socialLinks.map((social) => social.href),
      },
    ],
  };

  return (
    <>
      <HeroCarousel labels={dictionary.home} slides={localizedSlides} />

      {homeSections.map((section) => {
        const sectionProducts = section.productSlugs
          .map((slug) => publishedProducts.find((product) => product.slug === slug))
          .filter((product): product is NonNullable<typeof product> => Boolean(product));

        return (
          <section className="collection shell" id={section.id} key={section.id}>
            <div className="section-heading">
              <div>
                <p className="eyebrow">{dictionary.home.sectionEyebrow}</p>
                <h1>{dictionary.home.sectionTitle}</h1>
              </div>
              <p>{dictionary.home.sectionDescription}</p>
            </div>
            <ProductGrid labels={dictionary.productCard} products={sectionProducts} />
          </section>
        );
      })}

      <section className="mood-section shell" id="our-mood">
        <div className="mood-card mood-blue">
          <span className="mood-spark" aria-hidden="true">✦</span>
          <p className="eyebrow">{dictionary.home.feelingEyebrow}</p>
          <h2>{dictionary.home.feelingTitle}</h2>
          <p>{dictionary.home.feelingDescription}</p>
        </div>
        <div className="mood-card mood-yellow">
          <span className="mood-flower" aria-hidden="true">✿</span>
          <p className="eyebrow">{dictionary.home.sunnyEyebrow}</p>
          <h2>{dictionary.home.sunnyTitle}</h2>
          <Link className="text-link" href="/tops">
            {dictionary.home.explorePieces} <span>→</span>
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
