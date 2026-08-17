import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-sun" aria-hidden="true" />
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/assets/brand/logo.svg" alt="Loomyna" width={245} height={42} />
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <p className="footer-heading">Explore</p>
          <Link href="/#shop">Shop all</Link>
          <Link href="/#tops">Tops</Link>
          <Link href="/#bottoms">Bottoms</Link>
        </div>
        <div>
          <p className="footer-heading">Need a hand?</p>
          <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <span>{siteConfig.whatsappDisplay}</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Loomyna</span>
        <span>Made for brighter days.</span>
      </div>
    </footer>
  );
}
