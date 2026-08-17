import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { heroSlides, homeSections } from "@/config/home";
import { publishedProducts } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />

      {homeSections.map((section) => {
        const sectionProducts = section.productSlugs
          .map((slug) => publishedProducts.find((product) => product.slug === slug))
          .filter((product): product is NonNullable<typeof product> => Boolean(product));

        return (
          <section className="collection shell" id={section.id} key={section.id}>
            <div className="section-heading">
              <div>
                <p className="eyebrow">{section.eyebrow}</p>
                <h1>{section.title}</h1>
              </div>
              <p>{section.description}</p>
            </div>
            <ProductGrid products={sectionProducts} />
          </section>
        );
      })}

      <section className="mood-section shell" id="our-mood">
        <div className="mood-card mood-blue">
          <span className="mood-spark" aria-hidden="true">✦</span>
          <p className="eyebrow">The Loomyna feeling</p>
          <h2>Movement should feel like play.</h2>
          <p>
            We make cheerful little staples for yoga mornings, coffee walks, and wherever
            the sun takes you next.
          </p>
        </div>
        <div className="mood-card mood-yellow" id="tops">
          <span className="mood-flower" aria-hidden="true">✿</span>
          <p className="eyebrow">Soft. Sunny. Yours.</p>
          <h2>Wear the good mood.</h2>
          <a className="text-link" href="#shop">Explore all pieces <span>→</span></a>
        </div>
      </section>
      <span id="bottoms" className="anchor-offset" aria-hidden="true" />
    </>
  );
}
