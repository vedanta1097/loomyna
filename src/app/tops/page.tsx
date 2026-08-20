import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/CollectionPage";
import { getPublishedProducts } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  const copy = dictionary.collections.tops;

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: { canonical: "/tops" },
    openGraph: {
      type: "website",
      url: "/tops",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
    },
  };
}

export default async function TopsPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const products = getPublishedProducts(locale).filter((product) =>
    product.category === (locale === "id" ? "Atasan" : "Tops"),
  );

  return (
    <CollectionPage
      copy={dictionary.collections.tops}
      dictionary={dictionary}
      products={products}
    />
  );
}
