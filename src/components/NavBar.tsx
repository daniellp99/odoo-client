import Link from "next/link";

import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import { NavMenu } from "./NavMenu";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold text-background">Odoo Client</span>
      </Link>
      {items?.length ? <NavMenu items={items} /> : null}
    </div>
  );
}
