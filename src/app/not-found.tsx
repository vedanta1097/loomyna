import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export default async function NotFound() {
  const dictionary = getDictionary(await getLocale());

  return (
    <section className="not-found shell">
      <span aria-hidden="true">✿</span>
      <p className="eyebrow">{dictionary.notFound.eyebrow}</p>
      <h1>{dictionary.notFound.title}</h1>
      <p>{dictionary.notFound.description}</p>
      <Link className="button button-primary" href="/#shop">{dictionary.notFound.action}</Link>
    </section>
  );
}
