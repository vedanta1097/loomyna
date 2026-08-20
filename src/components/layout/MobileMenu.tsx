"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSelector } from "./LanguageSelector";

const navigation = [
  { key: "shop", href: "/#shop" },
  { key: "tops", href: "/#shop" },
  { key: "bottoms", href: "/#shop" },
  { key: "mood", href: "/#our-mood" },
] as const;

export function MobileMenu({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      closeButtonRef.current?.focus();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        className="icon-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={dictionary.header.openNavigation}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>
      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="mobile-menu-layer">
              <button
                type="button"
                className="menu-scrim"
                aria-label={dictionary.header.closeNavigation}
                onClick={() => setOpen(false)}
              />
              <aside
                className="menu-drawer"
                role="dialog"
                aria-modal="true"
                aria-label={dictionary.header.menuLabel}
              >
                <div className="menu-drawer-header">
                  <Image
                    src="/assets/brand/logo.svg"
                    alt="Loomyna"
                    width={392}
                    height={67}
                  />
                  <button
                    ref={closeButtonRef}
                    className="icon-button menu-close"
                    type="button"
                    aria-label={dictionary.header.closeNavigation}
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <nav
                  id="mobile-navigation"
                  aria-label={dictionary.header.mobileNavigationLabel}
                >
                  <p className="eyebrow">{dictionary.header.menuEyebrow}</p>
                  {navigation.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      {dictionary.navigation[item.key]}
                    </Link>
                  ))}
                  <a
                    className="button button-primary menu-contact"
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {dictionary.header.chatWithUs}
                  </a>
                  <LanguageSelector
                    id="mobile-language"
                    labels={dictionary.language}
                    locale={locale}
                  />
                </nav>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
