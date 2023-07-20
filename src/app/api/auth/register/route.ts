import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/db";
import { RegisterValidator } from "@/lib/validators/userAuth";
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = RegisterValidator.parse(body);

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist) {
      return new Response("Username already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Something went wrong. Please try again", {
      status: 500,
    });
  }
}