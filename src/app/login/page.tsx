'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import instance from "@/services/api";

import { 
  Container, LoginBox, Title, Form, InputGroup, Label, Input, ErrorText, Button, Message 
} from "./styles";

// Validação com Yup
const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido!").required("O email é obrigatório!"),
    password: yup.string().required("A senha é obrigatória!"),
});

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await instance.post("/login", data);
            localStorage.setItem("token", response.data.user.token)
            setSuccess("Login realizado com sucesso!");
            router.push("/dashboard");

        } catch (error: any) {
            if (error.response?.data?.message) {
                setError(Array.isArray(error.response.data.message) 
                    ? error.response.data.message.join(" - ") 
                    : error.response.data.message
                );
            } else {
                setError("Erro ao realizar o login!");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <LoginBox>
                <Title>Login</Title>

                {error && <Message type="error">{error}</Message>}
                {success && <Message type="success">{success}</Message>}

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup>
                        <Label htmlFor="email">E-mail:</Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="Digite seu e-mail"
                            {...register('email')}
                        />
                        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="password">Senha:</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Digite sua senha"
                            {...register('password')}
                        />
                        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                    </InputGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? "Acessando..." : "Acessar"}
                    </Button>
                </Form>
            </LoginBox>
        </Container>
    )
}
