import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ dictionary }: { dictionary: Dictionary }) {
  return (
    <footer className="footer">
      <div className="footer-sun" aria-hidden="true" />
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image
            src="/assets/brand/logo.svg"
            alt="Loomyna"
            width={245}
            height={42}
          />
          <p>{dictionary.metadata.description}</p>
        </div>
        <div>
          <p className="footer-heading">{dictionary.footer.explore}</p>
          <Link href="/#shop">{dictionary.navigation.shop}</Link>
          <Link href="/#shop">{dictionary.navigation.tops}</Link>
          <Link href="/#shop">{dictionary.navigation.bottoms}</Link>
        </div>
        <div>
          <p className="footer-heading">{dictionary.footer.needHelp}</p>
          <span>WhatsApp</span>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            {siteConfig.whatsappDisplay}
          </a>
        </div>
        <div>
          <p className="footer-heading">{dictionary.footer.followUs}</p>
          {siteConfig.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Loomyna</span>
        <span>{dictionary.footer.madeFor}</span>
      </div>
    </footer>
  );
}
