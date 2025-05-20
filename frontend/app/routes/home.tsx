import type {Route} from "./+types/home";
import UsersTable from "~/components/home/users-table";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Quokka users"},
    ];
}


export default function Home() {
    return (
        <>
            <UsersTable/>
        </>
    );
}
