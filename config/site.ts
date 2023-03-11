import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
}

export const siteConfig: SiteConfig = {
  name: "CarlosGPT",
  description: "Upload a PDF, start asking question",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "chat",
      href: "/chat",
    },
    {
      title: "report",
      href: "/report",
    },
  ],
}
