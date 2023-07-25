import Link from "next/link";

import { Icons } from "@/components/Icons";
import { MainNav } from "@/components/NavBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { getAuthSession } from "@/lib/auth";
import { getBaseUrl } from "@/lib/utils";
import { UserAccountNav } from "./UserAccountNav";

export async function SiteHeader() {
  const url = getBaseUrl();

  const session = await getAuthSession();

  return (
    <header className="bg-primary sticky top-0 z-40 w-full border-b">
      <div className="container flex h-12 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href={`${url}/sign-in`} className={buttonVariants()}>
              SignIn
            </Link>
          )}
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
