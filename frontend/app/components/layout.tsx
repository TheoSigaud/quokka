import {Navigate, Outlet, useLocation} from "react-router";
import {ThemeProvider} from "~/components/shadcn/theme-provider";
import {useAuth} from "~/hooks/useAuth";
import Logout from "~/components/common/logout";

const Layout = () => {
    const isAuthenticated = useAuth();
    const location = useLocation();

    if (isAuthenticated === null) {
        return <div></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Logout/>

            <Outlet />
        </ThemeProvider>
    );
};

export default Layout;
