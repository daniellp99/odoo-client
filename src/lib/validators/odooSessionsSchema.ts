import { z } from "zod";
// import { OdooVersion } from "@prisma/client";

// TODO: use type inference as alternative of hardcode odooVersion
// const enu = Object.values(OdooVersion) as readonly string[];

const versions = [
  "ODOO_10",
  "ODOO_11",
  "ODOO_12",
  "ODOO_13",
  "ODOO_14",
  "ODOO_15",
  "ODOO_16",
] as const;

export const OdooSessionValidator = z.object({
  url: z.string().url(),
  port: z.string().default("8080"),
  db: z.string(),
  username: z.string(),
  password: z.string(),
  odooVersion: z.enum(versions).default("ODOO_16"),
});

export type OdooSessionRequest = z.infer<typeof OdooSessionValidator>;
