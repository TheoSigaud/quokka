import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/shadcn/table"
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {Button} from "~/components/shadcn/button"
import FormDialog from "~/components/home/form-dialog";
import ConfirmDialog from "~/components/common/confirm-dialog";
import {getUsers, deleteUser, countUsers} from "~/apis/users.api";
import {Input} from "~/components/shadcn/input";
import PaginationTable from "~/components/home/pagination-table";

export default function UsersTable() {
    const [users, setUsers] = useState<any[]>([]);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [filter, setFilter] = useState<string>("");
    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);


    useEffect(() => {
        fetchUsers();
        fetchCount();
    }, [filter, offset]);


    const fetchUsers = async (): Promise<void> => {
        try {
            const users = await getUsers(filter, limit, offset);
            setUsers(users);
        } catch {
            toast.warning("Erreur lors de la recherche d'utilisateurs");
        }
    };

    const fetchCount = async (): Promise<void> => {
        try {
            const count = await countUsers(filter, limit, offset);
            setTotalUsers(count);
        } catch {
            toast.warning("Erreur lors de la recherche du nombre d'utilisateurs");
        }
    };

    const handleDeleteUser = async (): Promise<void> => {
        try {
            await deleteUser(selectedUser);
            setOpenConfirmModal(false);
            fetchUsers();
            fetchCount();
            toast.success("Utilisateur supprimé avec succès");
        } catch (error) {
            if (error instanceof Error) {
                toast.warning(error.message);
            } else {
                toast.warning("Erreur lors de la suppression d'un utilisateur");
            }
        }
    }
    return (
        <>
            <div
                className="w-10/12 vor flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex justify-start w-full my-5">
                    <Button className="cursor-pointer" onClick={() => {
                        setSelectedUser(null);
                        setOpenEditModal(true);
                    }}>Ajouter un utilisateur</Button>
                </div>

                <Input type="text" placeholder="Filtrer par email" className="mb-4" onChange={(e) => {
                    setFilter(e.target.value)
                }}/>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Date de naissance</TableHead>
                            <TableHead/>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                }).format(new Date(user.birthday))}</TableCell>
                                <TableCell>
                                    <div className="flex flex-row justify-end gap-x-4">
                                        <Button className="cursor-pointer" onClick={() => {
                                            setSelectedUser(user.id);
                                            setOpenEditModal(true)
                                        }}>Modifier</Button>
                                        <Button variant="secondary" className="cursor-pointer" onClick={() => {
                                            setSelectedUser(user.id);
                                            setOpenConfirmModal(true)
                                        }}>Supprimer</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="my-5">
                    <PaginationTable limit={limit} offset={offset} totalRows={totalUsers} setOffset={setOffset}/>
                </div>
            </div>
            <>
                <FormDialog open={openEditModal} setOpen={setOpenEditModal} userId={selectedUser}
                            getUsers={fetchUsers} getCount={fetchCount}/>
                <ConfirmDialog open={openConfirmModal} setOpen={setOpenConfirmModal} title="Supprimer l'utilisateur"
                               text="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
                               handleConfirm={handleDeleteUser}/>
            </>
        </>
    );
}
