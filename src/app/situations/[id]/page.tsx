'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import instance from "@/services/api"; 
import {Menu} from "@/components/Menu";

interface Situation {
    id: number;
    nameSituation: string;
    createdAt: string;
    updatedAt: string;
}


export default function ViewSituationId() {
  const { id } = useParams(); 
  const [situation, setSituation] = useState<Situation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSituation = async (id) => {
    try {
      setLoading(true);
      const response = await instance.get(`/situations/${id}`);
      setSituation(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error("Erro ao buscar situação:", error.response?.data || error.message);
      setError("Não foi possível carregar a situação.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const situationId = Array.isArray(id) ? id[0] : id;
      fetchSituation(situationId);
    }
  }, [id]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {error && <p>{error}</p>}
      <Menu />
      {!loading && situation && (
        <div style={{paddingTop: "20px", fontFamily: "Arial, sans-serif" }}>
            <p>ID: {situation.id}</p>
            <p>Nome da Situação: {situation.nameSituation}</p>
            <p>Criado em: {new Date(situation.createdAt).toLocaleString()}</p>
            <p>Atualizado em: {new Date(situation.updatedAt).toLocaleString()}</p>
        </div>
        )}
    </div>
  );
}
