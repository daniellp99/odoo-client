import { z } from "zod";
import { OdooVersion } from "@prisma/client";

export const OdooSessionValidator = z.object({
  url: z.string().url(),
  port: z.string().default("8080"),
  db: z.string(),
  username: z.string(),
  password: z.string(),
  odooVersion: z.nativeEnum(OdooVersion),
});

export type OdooSessionRequest = z.infer<typeof OdooSessionValidator>;

export const OdooSessionPasswordLess = OdooSessionValidator.omit({
  password: true,
});

export type OdooSessionTableShape = z.infer<typeof OdooSessionPasswordLess>;
