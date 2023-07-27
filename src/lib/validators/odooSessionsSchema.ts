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

export const OdooSessionTableShape = OdooSessionValidator.omit({
  password: true,
}).extend({ id: z.string() });

export const OdooSessionTest = OdooSessionValidator.omit({
  odooVersion: true,
});

export type OdooSessionRequest = z.infer<typeof OdooSessionValidator>;
export type OdooSessionTableShapeRequest = z.infer<
  typeof OdooSessionTableShape
>;
export type OdooSessionTestRequest = z.infer<typeof OdooSessionTest>;
