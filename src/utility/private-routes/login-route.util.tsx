import { Navigate } from "react-router-dom";

interface LoginRoutePop{
    isLoggedIn: boolean;
    children: React.ReactNode;
}

export const LoginRoute = ({isLoggedIn, children}: LoginRoutePop) => {
    if(!isLoggedIn) return <Navigate to="/must-login" replace/>
    return <>{children}</>
}