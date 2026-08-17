import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return <p className="announcement">{siteConfig.announcement}</p>;
}
