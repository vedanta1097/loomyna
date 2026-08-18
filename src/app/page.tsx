import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { heroSlides, homeSections } from "@/config/home";
import { getPublishedProducts } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const publishedProducts = getPublishedProducts(locale);
  const localizedSlides = heroSlides.map((slide) => ({
    ...slide,
    imageAlt: dictionary.home.heroAlt,
  }));

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
        <div className="mood-card mood-yellow" id="tops">
          <span className="mood-flower" aria-hidden="true">✿</span>
          <p className="eyebrow">{dictionary.home.sunnyEyebrow}</p>
          <h2>{dictionary.home.sunnyTitle}</h2>
          <a className="text-link" href="#shop">{dictionary.home.explorePieces} <span>→</span></a>
        </div>
      </section>
      <span id="bottoms" className="anchor-offset" aria-hidden="true" />
    </>
  );
}
