import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSelector } from "./LanguageSelector";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { key: "shop", href: "/#shop" },
  { key: "tops", href: "/tops" },
  { key: "bottoms", href: "/bottoms" },
  { key: "accessories", href: "/accessories" },
  { key: "about", href: "/about-us" },
] as const;

export function Header({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <MobileMenu dictionary={dictionary} locale={locale} />
        <Link
          className="brand"
          href="/"
          aria-label={dictionary.header.homeLabel}
        >
          <Image
            src="/assets/brand/logo.svg"
            alt="Loomyna"
            width={392}
            height={67}
            loading="eager"
          />
        </Link>
        <nav
          className="desktop-nav"
          aria-label={dictionary.navigation.mainLabel}
        >
          {navigation.map((item) => (
            <Link key={item.key} href={item.href}>
              {dictionary.navigation[item.key]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSelector
            id="desktop-language"
            labels={dictionary.language}
            locale={locale}
          />
          <a
            className="header-chat"
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            aria-label={dictionary.header.chatLabel}
          >
            <ChatIcon />
            <span>{dictionary.header.chat}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M8.5 9.2c.7 2.1 2.2 3.6 4.3 4.3" />
    </svg>
  );
}
