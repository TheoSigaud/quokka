import { z } from "zod";

export const userSchema  = z.object({
    id: z.string().uuid(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    birthday: z.date()
});

export const userFormSchema  = z.object({
    first_name: z.string().min(2, {
        message: "Le prénom doit comporter au moins 2 caractères",
    }),
    last_name: z.string().min(2, {
        message: "Le nom doit comporter au moins 2 caractères",
    }),
    email: z.string().email({
        message: "L'email doit être valide",
    }),
    birthday: z.date({
        message: "La date de naissance doit être valide",
    }),
    password: z.string().min(6, {
        message: "Le mot de passe doit comporter au moins 6 caractères",
    }),
});