import {z} from "zod";
import {userFormSchema, userSchema} from "~/schemas/user.schema";

const apiUrl = import.meta.env.VITE_API_URL;

export const getUsers = async (filter: string, limit: number, offset: number): Promise<z.infer<typeof userSchema>[]> => {
    try {
        const response: Response = await fetch(`${apiUrl}/users?filter=${filter}&limit=${limit}&offset=${offset}`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la recherche d'utilisateurs");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const createUser = async (user: z.infer<typeof userFormSchema>) => {
    try {
        const response: Response = await fetch(`${apiUrl}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création d'un utilisateur");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (userId: string): Promise<z.infer<typeof userSchema>> => {
    try {
        const response: Response = await fetch(`${apiUrl}/users/id/${userId}`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la recherche d'un utilisateur par son ID");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const countUsers = async (filter: string, limit: number, offset: number): Promise<number> => {
    try {
        const response: Response = await fetch(`${apiUrl}/users/count?filter=${filter}&limit=${limit}&offset=${offset}`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Erreur lors du comptage des utilisateurs");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId: string, user: z.infer<typeof userFormSchema>) => {
    try {
        const response: Response = await fetch(`${apiUrl}/users/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de l'utilisateur");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId: string): Promise<boolean> => {
    try {
        const response: Response = await fetch(`${apiUrl}/users/delete/${userId}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la suppression d'un utilisateur");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

