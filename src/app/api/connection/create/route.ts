import { NextResponse } from "next/server";
import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { OdooSessionValidator } from "@/lib/validators/odooSessionsSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { url, port, db, username, password, odooVersion } =
      OdooSessionValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existConnection = await prisma.odooSession.findFirst({
      where: { url, port, db, username, password, odooVersion },
    });

    if (existConnection) {
      return NextResponse.json(
        { error: "Connection already exist" },
        { status: 409 }
      );
    }

    const newConnection = await prisma.odooSession.create({
      data: {
        authorId: session.user.id,
        url,
        port,
        db,
        username,
        password,
        odooVersion,
      },
    });

    return NextResponse.json({ connection: newConnection }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => issue.message);
      return NextResponse.json({ error: errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
