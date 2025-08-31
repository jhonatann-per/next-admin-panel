'use client';
import instance from "@/services/api";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {
  Container,
  Form,
  Title,
  Label,
  Input,
  Button,
  ErrorText,
  SuccessText,
  SmallText,
} from "./styles";

interface Situation {
  nameSituation: string;
}

const situationSchema = yup.object().shape({
  nameSituation: yup
    .string()
    .required("O nome da situação é obrigatório.")
    .min(5, "O nome da situação deve ter pelo menos 5 caracteres."),
});

export default function CreateSituation() {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");   
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Situation>({
    resolver: yupResolver(situationSchema),
  });

  const onSubmit = async (data: Situation) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await instance.post("/situations", data);
      setSuccessMessage(response.data.message || "Situação criada com sucesso!");
      reset();
    } catch (err: any) {
      console.error("Failed to create situation:", err);
      setErrorMessage(err.response?.data?.message || "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Criar Situação</Title>

        <Label htmlFor="nameSituation">Nome</Label>
        <Input type="text" {...register("nameSituation")} />
        {errors.nameSituation && (
          <ErrorText>{errors.nameSituation.message}</ErrorText>
        )}
        <SmallText>Mínimo 5 caracteres</SmallText>

        {successMessage && <SuccessText>{successMessage}</SuccessText>}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar"}
        </Button>
      </Form>
    </Container>
  );
}
