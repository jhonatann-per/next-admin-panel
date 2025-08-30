"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import instance from "@/services/api";
import { Menu } from "@/components/Menu";

interface Situation {
  id: number;
  nameSituation: string;
  createdAt: string;
  updatedAt: string;
}

export default function ViewSituationId() {
  const { id } = useParams() as { id: string };

  const [situation, setSituation] = useState<Situation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSituation = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/situations/${id}`);
        setSituation(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Erro ao buscar situação:", err.response?.data || err.message);
        setError("Não foi possível carregar a situação.");
      } finally {
        setLoading(false);
      }
    };

    fetchSituation();
  }, [id]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Menu />
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {situation && (
        <div style={{ paddingTop: "20px" }}>
          <p>ID: {situation.id}</p>
          <p>Nome da Situação: {situation.nameSituation}</p>
          <p>Criado em: {new Date(situation.createdAt).toLocaleString()}</p>
          <p>Atualizado em: {new Date(situation.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
