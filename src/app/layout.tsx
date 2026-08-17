import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Loomyna — Made for brighter days",
    template: "%s | Loomyna",
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "Loomyna",
    title: "Loomyna — Made for brighter days",
    description: siteConfig.description,
    images: ["/assets/banners/desktop/summer-edit.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <AnnouncementBar />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
