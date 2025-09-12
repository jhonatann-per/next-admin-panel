"use client"
import { Menu } from "@/components/Menu"; 
import ProtectedRoute from "@/components/ProtectedRoute";
export default function Dashboard() {
  return (
   <ProtectedRoute>
      <Menu />
      <h1>Olá jhonatan</h1>
   </ProtectedRoute>
  );
}
