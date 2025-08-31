"use client"; 
import { useState } from "react";
import instance from "@/services/api";
import { Menu } from "@/components/Menu";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Container, Form, Title, Label, Input, Button, ErrorText, SuccessText } from "./styles";

interface PostCategory {
  name: string;
}

const categorySchema = yup.object({
  name: yup
    .string()
    .required("O nome da categoria é obrigatório.")
    .min(5, "O nome da categoria deve ter pelo menos 5 caracteres."),
});

export default function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostCategory>({
    resolver: yupResolver(categorySchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: PostCategory) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccess(false);

    try {
      await instance.post("/product-categories", data);
      setSuccess(true);
      reset();
    } catch (error: any) {
      if (error.response?.data) {
        setErrorMessage(error.response.data.message || "Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Menu />
      <Title>Criar Categoria</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Nome:</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          <small>Mínimo 5 caracteres</small>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar"}
        </Button>
      </Form>

      {success && <SuccessText>Categoria criada com sucesso!</SuccessText>}
      {errorMessage && <ErrorText> {errorMessage}</ErrorText>}
    </Container>
  );
}
