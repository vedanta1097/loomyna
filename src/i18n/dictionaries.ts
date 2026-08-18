import type { Locale } from "./config";
import en, { type Dictionary } from "./en";
import id from "./id";

export type { Dictionary } from "./en";

export const dictionaries = { en, id };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
