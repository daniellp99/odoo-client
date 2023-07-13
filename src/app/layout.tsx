import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/context/Providers";
import { cn } from "@lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Odoo Client",
  description: "General app for communicate with odoo instance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("antialiased", inter.className)}>
      <body className="min-h-screen pt-12">
        <Providers>
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
