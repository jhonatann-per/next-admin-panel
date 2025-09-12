import { ReactNode } from "react";

import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouterProps {
    children: ReactNode;
}

export default function ProtectedRoute({children} : ProtectedRouterProps){
    const { authenticated } = useAuth();
    if(!authenticated){
        return<p>Carregando...</p>
    }
    return<>{children}</>
}