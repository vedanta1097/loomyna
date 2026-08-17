import Image from "next/image";
import Link from "next/link";
import { navigation, siteConfig } from "@/config/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <MobileMenu />
        <Link className="brand" href="/" aria-label="Loomyna home">
          <Image
            src="/assets/brand/logo.svg"
            alt="Loomyna"
            width={392}
            height={67}
            loading="eager"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="header-chat"
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Loomyna on WhatsApp"
        >
          <ChatIcon />
          <span>Let&apos;s chat</span>
        </a>
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
