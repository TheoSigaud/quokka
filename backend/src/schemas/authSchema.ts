import {z} from 'zod';
import {zodToJsonSchema} from "zod-to-json-schema";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const authCheckResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    iat: z.number(),
});

export const authLogoutResponseSchema = z.object({
    message: z.string(),
});


export const authErrorResponseSchema = z.object({
    message: z.string(),
});


export const loginSchemaJson = zodToJsonSchema(loginSchema);
export const authCheckResponseSchemaJson = zodToJsonSchema(authCheckResponseSchema);
export const authLogoutResponseSchemaJson = zodToJsonSchema(authLogoutResponseSchema);
export const authErrorResponseSchemaJson = zodToJsonSchema(authErrorResponseSchema);