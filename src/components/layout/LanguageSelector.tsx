"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { localeCookieName, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type LanguageSelectorProps = {
  id: string;
  locale: Locale;
  labels: Dictionary["language"];
};

export function LanguageSelector({ id, locale, labels }: LanguageSelectorProps) {
  const router = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: Locale) {
    setSelectedLocale(nextLocale);
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = nextLocale;
    startTransition(() => router.refresh());
  }

  return (
    <label className="language-selector" htmlFor={id}>
      <span className="sr-only">{labels.label}</span>
      <select
        id={id}
        value={selectedLocale}
        disabled={isPending}
        aria-label={labels.label}
        onChange={(event) => changeLocale(event.target.value as Locale)}
      >
        <option value="en">EN · {labels.english}</option>
        <option value="id">ID · {labels.indonesian}</option>
      </select>
    </label>
  );
}
