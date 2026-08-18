import "server-only";

import { cookies, headers } from "next/headers";
import { isLocale, localeCookieName, localeFromAcceptLanguage, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const savedLocale = (await cookies()).get(localeCookieName)?.value;
  if (isLocale(savedLocale)) return savedLocale;

  return localeFromAcceptLanguage((await headers()).get("accept-language"));
}
