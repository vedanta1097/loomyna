"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navigation, siteConfig } from "@/config/site";

export function MobileMenu() {
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
        aria-label="Open navigation"
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
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <aside
            className="menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="menu-drawer-header">
              <Image src="/assets/brand/logo.svg" alt="Loomyna" width={392} height={67} />
              <button
                ref={closeButtonRef}
                className="icon-button menu-close"
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <nav id="mobile-navigation" aria-label="Mobile navigation">
              <p className="eyebrow">Find your sunshine</p>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <a
                className="button button-primary menu-contact"
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat with us
              </a>
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
