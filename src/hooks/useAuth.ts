"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/services/api";


export function useAuth(){
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if(!token){
            router.push("/login");
        }
        const validateToken = async() =>{
            try {
                await instance.get("/validate-token");
                setAuthenticated(true);
            } catch (error) {
                localStorage.removeItem("token");
                router.push("/login")
                
            }finally {
                setLoading(false);
            }
        }
        validateToken();

    }, []);
    return { authenticated, loading };
}