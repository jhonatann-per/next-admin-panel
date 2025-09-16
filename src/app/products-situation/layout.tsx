"use client";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface ProductSituationLayoutProps {
  children: ReactNode;
}

export default function ProductSituationLayout({ children }: ProductSituationLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
