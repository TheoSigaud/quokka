import {Button} from "~/components/shadcn/button";
import {logout} from "~/apis/auth.api";
import {toast} from "sonner";
import {useNavigate} from "react-router";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            toast.error("Échec de la déconnexion");
        }
    };

    return (
        <Button className="m-4 cursor-pointer" onClick={() => {handleLogout()}}>Se déconnecter</Button>
    );
}