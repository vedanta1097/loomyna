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
          <Image src="/assets/brand/logo.svg" alt="Loomyna" width={245} height={42} />
          <p>{dictionary.metadata.description}</p>
        </div>
        <div>
          <p className="footer-heading">{dictionary.footer.explore}</p>
          <Link href="/#shop">{dictionary.navigation.shop}</Link>
          <Link href="/#tops">{dictionary.navigation.tops}</Link>
          <Link href="/#bottoms">{dictionary.navigation.bottoms}</Link>
        </div>
        <div>
          <p className="footer-heading">{dictionary.footer.needHelp}</p>
          <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <span>{siteConfig.whatsappDisplay}</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Loomyna</span>
        <span>{dictionary.footer.madeFor}</span>
      </div>
    </footer>
  );
}
