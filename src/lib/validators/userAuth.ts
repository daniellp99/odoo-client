import { z } from "zod";

export const RegisterValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one symbol"),
});

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterRequest = z.infer<typeof RegisterValidator>;
export type LoginRequest = z.infer<typeof LoginValidator>;
