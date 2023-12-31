import type { Metadata } from "next";
import "../globals.css";

import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";
import Providers from "@/context/Providers";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <div className="container max-w-7xl mx-auto h-full">{children}</div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
