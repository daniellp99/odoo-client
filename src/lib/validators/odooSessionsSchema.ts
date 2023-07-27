import { OdooVersion } from "@prisma/client";
import { z } from "zod";

export const OdooSessionSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  port: z.string().default("8080"),
  db: z.string(),
  username: z.string(),
  password: z.string(),
  odooVersion: z.nativeEnum(OdooVersion),
});

export const OdooSessionValidator = OdooSessionSchema.omit({ id: true });
export const OdooSessionTableShape = OdooSessionSchema.omit({
  password: true,
});
export const OdooSessionTest = OdooSessionSchema.omit({
  id: true,
  odooVersion: true,
});

export type OdooSessionRequest = z.infer<typeof OdooSessionValidator>;
export type OdooSessionTableShapeRequest = z.infer<
  typeof OdooSessionTableShape
>;
export type OdooSessionTestRequest = z.infer<typeof OdooSessionTest>;
