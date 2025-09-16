"use client";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface SituationsLayoutProps {
  children: ReactNode;
}

export default function SituationsLayout({ children }: SituationsLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
