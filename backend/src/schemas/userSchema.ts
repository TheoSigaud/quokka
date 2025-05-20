import {z} from 'zod';
import {zodToJsonSchema} from "zod-to-json-schema";

export const userSchema = z.object({
    id: z.string().uuid(),
    last_name: z.string(),
    first_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    birthday: z.string().datetime(),
});

export const usersFormSchema = z.object({
    filter: z.string().optional().default(""),
    limit: z.number(),
    offset: z.number(),
});

export const userIdSchema = z.object({
    id: z.string().uuid(),
});

export const userFormSchema = z.object({
    last_name: z.string(),
    first_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    birthday: z.string().datetime(),
});

export const userResponseSchema = z.object({
    id: z.string().uuid(),
    last_name: z.string(),
    first_name: z.string(),
    email: z.string().email(),
    birthday: z.date(),
});

export const userErrorResponseSchema = z.object({
    message: z.string(),
});


export const userFormSchemaJson = zodToJsonSchema(userFormSchema);
export const userResponseSchemaJson = zodToJsonSchema(userResponseSchema);
export const userErrorResponseSchemaJson = zodToJsonSchema(userErrorResponseSchema);
export const usersFormSchemaJson = zodToJsonSchema(usersFormSchema);