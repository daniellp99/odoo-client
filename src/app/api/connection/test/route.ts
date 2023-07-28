import { NextResponse } from "next/server";
import { z } from "zod";

import { OdooSessionTest } from "@/lib/validators/odooSessionsSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, port, db, username, password } = OdooSessionTest.parse(body);

    var Odoo = require("async-odoo-xmlrpc");
    var odoo = new Odoo({
      url: url,
      port: port,
      db: db,
      username: username,
      password: password,
    });
    const test = await odoo.connect();

    return NextResponse.json({ test: test }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => issue.message);
      return NextResponse.json({ error: errors }, { status: 400 });
    }
    if (
      typeof error === "object" &&
      "errno" in error! &&
      error.errno === -3008 &&
      "hostname" in error
    ) {
      return NextResponse.json(
        { error: `Connection refuse to "${error.hostname}" domain` },
        { status: 400 }
      );
    }
    if (
      typeof error === "object" &&
      "code" in error! &&
      error.code === "ECONNREFUSED"
    ) {
      return NextResponse.json({ error: "Incorrect Port", status: 400 });
    }
    if (
      typeof error === "object" &&
      "code" in error! &&
      error.code === 1 &&
      "faultString" in error &&
      typeof error.faultString === "string"
    ) {
      const startIndex = error.faultString.lastIndexOf("OperationalError:");
      const endIndex = error.faultString.lastIndexOf("\n");

      const errorMessage = error.faultString
        .substring(startIndex + "OperationalError:".length, endIndex)
        .trim();

      return NextResponse.json({ error: `${errorMessage}`, status: 400 });
    }
    if (
      typeof error === "object" &&
      "message" in error! &&
      typeof error.message === "string"
    ) {
      return NextResponse.json({ error: `${error.message}`, status: 400 });
    }
    return NextResponse.json(
      { error: "Error when try connect Odoo XML-RPC." },
      { status: 500 }
    );
  }
}
