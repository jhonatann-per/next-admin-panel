"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/services/api";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      router.push("/login");
      return;
    }

    const validateToken = async () => {
      try {
        await instance.get("/validate-token");
        setAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  return { authenticated, loading };
}
