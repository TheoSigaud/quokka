import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "~/components/shadcn/dialog"
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Input} from "~/components/shadcn/input";
import {Button} from "~/components/shadcn/button";
import {Calendar} from "~/components/shadcn/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/shadcn/popover";
import {CalendarIcon} from "lucide-react"
import {format} from "date-fns";
import {cn} from "~/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "~/components/shadcn/form";
import {useForm} from "react-hook-form"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {getUserById, updateUser, createUser} from "~/apis/users.api";
import {userFormSchema} from "~/schemas/user.schema";

interface EditDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string;
    getUsers: () => void;
    getCount: () => void;
}

export default function FormDialog({open, setOpen, userId, getUsers, getCount}: EditDialogProps) {
    const [date, setDate] = useState<Date>();

    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            birthday: undefined,
        },
    })

    useEffect(() => {
        if (userId != null) {
            fetchUserById();
        } else {
            form.reset({
                email: "",
                first_name: "",
                last_name: "",
                password: "",
                birthday: undefined,
            });
        }
    }, [userId]);

    const fetchUserById = async () => {
        try {
            const data = await getUserById(userId);
            setDate(new Date(data.birthday));
            form.reset({
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                password: "",
                birthday: new Date(data.birthday),
            });
        } catch (error) {
            toast.warning("Erreur lors de la recherche d'un utilisateur");
        }
    }

    const handleUpdateUser = async (values: z.infer<typeof userFormSchema>) => {
        try {
            await updateUser(userId, values);
            toast.success("Mise à jour de l'utilisateur réussie");
            getUsers();
            getCount();
            setOpen(false);
        } catch (error) {
            toast.warning("Erreur lors de la mise à jour de l'utilisateur");
        }
    };

    const handleCreateUser = async (values: z.infer<typeof userFormSchema>) => {
        try {
            await createUser(values);
            toast.success("Utilisateur créé avec succès");
            getUsers();
            getCount();
            setOpen(false);
        } catch (error) {
            toast.warning("Erreur lors de la création d'un utilisateur");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{userId ? "Modification de l'utilisateur" : "Création d'un utilisateur"}</DialogTitle>
                    <DialogDescription/>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(userId ? handleUpdateUser : handleCreateUser)} className="w-2/3 space-y-6">
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
                                name="first_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Jean" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Petit" {...field}/>
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
                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Date de naissance</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger className="w-full" asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal cursor-pointer",
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon/>
                                                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Sélectionner une date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                const correctedDate = new Date(date);
                                                                correctedDate.setHours(12, 0, 0, 0);
                                                                field.onChange(correctedDate);
                                                            } else {
                                                                field.onChange(date);
                                                            }
                                                        }}
                                                        disabled={{after: new Date()}}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Enregistrer</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

