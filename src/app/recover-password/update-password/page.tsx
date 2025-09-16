'use client'

import React, { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from 'yup';
import instance from "@/services/api";
import Link from "next/link";

const schema = yup.object().shape({
    password: yup.string().required("O campo senha é obrigatório!").min(6, "O campo senha deve ter no mínimo 6 caracteres!"),
});

export default function UpdatePassword() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { password: string, recoverPassword?: string, email?: string }) => {
        data.recoverPassword = searchParams.get("key") || "";
        data.email = searchParams.get("email") || "";

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await instance.put("/update-password", data);
            reset();
            sessionStorage.setItem("successMessage", response.data.message || "Senha atualizada com sucesso!");
            router.push("/login");
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                if (Array.isArray(error.response.data.message)) {
                    setError(error.response.data.message.join(" - "));
                } else {
                    setError(error.response.data.message);
                }
            } else {
                setError("Erro ao atualizar a senha!");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        const email = searchParams.get("email") || "";
        const recoverPassword = searchParams.get("key") || "";

        if (!email || !recoverPassword) {
            sessionStorage.setItem("errorMessage", "Dados inválidos para recuperar a senha!");
            router.push("/login");
        }

        const validateKey = async () => {
            try {
                await instance.post("/validate-recover-password", { email, recoverPassword });
            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.message) {
                    if (Array.isArray(error.response.data.message)) {
                        sessionStorage.setItem("errorMessage", error.response.data.message.join(" - "));
                    } else {
                        sessionStorage.setItem("errorMessage", error.response.data.message);
                    }
                } else {
                    sessionStorage.setItem("errorMessage", "Dados inválidos para recuperar a senha!");
                }
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }

        validateKey();
    }, []);

    return (
        <div>
            <h1>Recuperar Senha</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "#f00" }}>{error}</p>}
            {success && <p style={{ color: "#086" }}>{success}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="password">Senha: </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Senha com mínimo 6 caracteres"
                        {...register('password')}
                        className="border"
                    /><br />
                    {errors.password && <p style={{ color: "#f00" }}>{errors.password.message}</p>}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Atualizar"}
                </button>
            </form>
        </div>
    )
}
