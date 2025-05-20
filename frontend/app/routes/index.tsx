import type {Route} from "./+types/home";
import {type NavigateFunction, useNavigate} from "react-router";
import {useEffect} from "react";
import {useAuth} from "~/hooks/useAuth";
import {ThemeProvider} from "~/components/shadcn/theme-provider";
import Login from "~/components/auth/login";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Quokka users"},
    ];
}

export default function Home() {
    const navigate: NavigateFunction = useNavigate();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated]);


    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
           <Login />
        </ThemeProvider>
    );
}
