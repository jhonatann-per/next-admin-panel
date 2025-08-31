"use client";
import instance from "@/services/api";
import { useState } from "react";
import { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "./styles";

interface PostProductSituation {
  name: string;
}

const productSituationSchema = yup.object({
  name: yup
    .string()
    .required("O nome da situação do produto é obrigatório.")
    .min(5, "O nome da situação do produto deve ter pelo menos 5 caracteres."),
});

export default function CreateProductSituation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostProductSituation>({
    resolver: yupResolver(productSituationSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const onSubmit = async (data: PostProductSituation) => {
    setError(null);
    setSuccess(null);
    setStatusCode(null);

    try {
      const response = await instance.post("/product-situations", data);

      reset();
      setSuccess(response.data?.message || "Situação criada com sucesso!");
      setStatusCode(response.status);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response) {
        setError(error.response.data?.message || "Erro desconhecido do servidor");
        setStatusCode(error.response.status);
      } else {
        setError("Erro de conexão com o servidor.");
      }
      console.error("Erro ao criar situação do produto:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Criar Situação do Produto</Title>

        <Label htmlFor="name">Nome da nova Situação</Label>
        <Input type="text" {...register("name")} />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

        <Button type="submit">Criar</Button>
      </Form>

      {success && (
        <SuccessText>
          {success} (status: {statusCode})
        </SuccessText>
      )}
      {error && (
        <ErrorText>
          {error} {statusCode && `(status: ${statusCode})`}
        </ErrorText>
      )}
    </Container>
  );
}
