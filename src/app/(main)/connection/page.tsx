import { getAuthSession } from "@/lib/auth";

import { z } from "zod";

import { columns } from "@/app/(main)/connection/components/columns";
import { DataTable } from "./components/data-table";
import { OdooSessionPasswordLess } from "@/lib/validators/odooSessionsSchema";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

async function getOdooSessions(userId: string) {
  const odooSessions = prisma.odooSession.findMany({
    where: { authorId: userId },
  });

  return z.array(OdooSessionPasswordLess).parse(await odooSessions);
}

export default async function ConnectionPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/sign-in?callbackUrl=/connection");
  }
  const odooSessions = await getOdooSessions(session.user.id);

  return (
    <main className="flex h-full flex-1 flex-col space-y-8 p-8">
      <DataTable data={odooSessions} columns={columns} />
    </main>
  );
}
