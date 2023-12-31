export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Odoo Client",
  description: "General app for communicate with odoo instance",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Connections",
      href: "/connection",
    },
  ],
  links: {
    github: "https://github.com/shadcn/ui",
  },
};
