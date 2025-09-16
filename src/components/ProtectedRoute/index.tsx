import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>; 
  }

  if (!authenticated) {
    return null; 
  }

  return <>{children}</>;
}
