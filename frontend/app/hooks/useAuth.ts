import { useState, useEffect } from "react";
import {authCheck} from "~/apis/auth.api";
import {z} from "zod";
import {authCheckResponseSchema} from "~/schemas/auth.schema";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading

    useEffect(() => {
        authCheck()
            .then((response: z.infer<typeof authCheckResponseSchema>) => {
                setIsAuthenticated(true);
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    return isAuthenticated;
}
