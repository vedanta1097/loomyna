import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dictionary.metadata.title,
      template: "%s | Loomyna",
    },
    description: dictionary.metadata.description,
    icons: { icon: "/favicon.svg" },
    openGraph: {
      type: "website",
      siteName: "Loomyna",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: ["/assets/banners/desktop/hero-banner.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">
          {dictionary.skipToContent}
        </a>
        <AnnouncementBar announcement={dictionary.announcement} />
        <Header dictionary={dictionary} locale={locale} />
        <main id="main-content">{children}</main>
        <Footer dictionary={dictionary} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
