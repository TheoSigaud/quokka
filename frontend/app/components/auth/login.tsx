import {toast} from "sonner"
import {type NavigateFunction, useNavigate} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/shadcn/card";
import {Input} from "~/components/shadcn/input";
import {Button} from "~/components/shadcn/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/shadcn/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginResponseSchema, loginSchema} from "~/schemas/auth.schema";
import {login} from "~/apis/auth.api";
import {ThemeProvider} from "~/components/shadcn/theme-provider";

export default function Login() {
    const navigate: NavigateFunction = useNavigate();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (values: z.infer<typeof loginSchema>): Promise<void> => {
        try {
            const response: z.infer<typeof loginResponseSchema> = await login(values);
            if (response.success) {
                toast.success("Connexion réussie");
                navigate("/home");
                return;
            }
            toast.warning("Erreur lors de la connexion");
        } catch (error) {
            if (error instanceof Error) {
                toast.warning(error.message);
            } else {
                toast.warning("Erreur lors de la connexion");
            }
        }
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Card className="w-full px-4 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/4 xxl:w-1/6 md:px-0">
                    <CardHeader>
                        <div className="flex flex-col w-full items-center gap-y-4">
                            <img className="w-16 h-16 rounded-full" src="/quokka.jpg"
                                 alt="Logo"/>
                            <CardTitle className="text-xl">Bienvenue sur Quokka</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleLogin)} className="w-full space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="email@example.com" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Mot de passe</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="******" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full cursor-pointer" type="submit">Se connecter</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </ThemeProvider>
    );
}
