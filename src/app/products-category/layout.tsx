"use client";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface ProductCategoryLayoutProps {
  children: ReactNode;
}

export default function ProductCategoryLayout({ children }: ProductCategoryLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
