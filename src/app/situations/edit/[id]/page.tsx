"use client";
import { useState, useEffect, FormEvent } from "react";
import instance from "@/services/api";
import { useParams } from "next/navigation";
import {
  Container,
  Title,
  Loading,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "./styles";

export default function EditSituation() {
  const [nameSituation, setNameSituation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams() as { id: string };

  const fetchSituationById = async (id: string) => {
    try {
      const response = await instance.get(`/situations/${id}`);
      const data = response.data;
      setNameSituation(data.nameSituation);
    } catch (error) {
      console.error("Erro ao buscar situação", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSituationById(id);
  }, [id]);

  const editSituation = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await instance.put(`/situations/${id}`, { nameSituation: nameSituation });
      alert("Situação editada com sucesso!");
    } catch (error) {
      alert("Erro ao editar situação");
    }
  };

  if (loading) {
    return (
      <Container>
        <Loading>Carregando...</Loading>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Editar Situação</Title>
      <Form onSubmit={editSituation}>
        <FormGroup>
          <Label htmlFor="name">Nome da Situação</Label>
          <Input
            type="text"
            id="name"
            value={nameSituation}
            onChange={(e) => setNameSituation(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" disabled={!nameSituation}>
          Salvar Alterações
        </Button>
      </Form>
    </Container>
  );
}
