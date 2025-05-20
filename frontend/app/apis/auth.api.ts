import {z} from "zod";
import {authCheckResponseSchema, loginResponseSchema, type loginSchema} from "~/schemas/auth.schema";

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (values: z.infer<typeof loginSchema>): Promise<z.infer<typeof loginResponseSchema>> => {
    try {
        const response: Response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Une erreur s'est produite");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const authCheck = async (): Promise<z.infer<typeof authCheckResponseSchema>> => {
    try {
        const response: Response = await fetch(`${apiUrl}/auth/check`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Une erreur s'est produite");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const logout = async (): Promise<z.infer<typeof loginResponseSchema>> => {
    try {
        const response: Response = await fetch(`${apiUrl}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Une erreur s'est produite");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}


