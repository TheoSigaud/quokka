import { z } from "zod";

export const loginSchema  = z.object({
    email: z.string().email(),
    password: z.string()
});

export const loginResponseSchema  = z.object({
    success: z.boolean()
});

export const authCheckResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    iat: z.number(),
});
