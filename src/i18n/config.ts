export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "loomyna-locale";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function localeFromAcceptLanguage(value: string | null): Locale {
  if (!value) return defaultLocale;

  const preferredLanguages = value
    .split(",")
    .map((part) => {
      const [tag, ...parameters] = part.trim().toLowerCase().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      return {
        tag,
        quality: quality ? Number.parseFloat(quality.split("=")[1]) : 1,
      };
    })
    .filter(({ quality }) => Number.isFinite(quality) && quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of preferredLanguages) {
    if (tag === "id" || tag.startsWith("id-") || tag === "in") return "id";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return defaultLocale;
}
