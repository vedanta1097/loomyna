import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/CollectionPage";
import { getPublishedProducts } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  const copy = dictionary.collections.accessories;

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: { canonical: "/accessories" },
    openGraph: {
      type: "website",
      url: "/accessories",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
    },
  };
}

export default async function AccessoriesPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const products = getPublishedProducts(locale).filter((product) =>
    product.category === (locale === "id" ? "Aksesori" : "Accessories"),
  );

  return (
    <CollectionPage
      copy={dictionary.collections.accessories}
      dictionary={dictionary}
      products={products}
    />
  );
}
