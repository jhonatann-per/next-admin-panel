"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import instance from "@/services/api";
import { Menu } from "@/components/Menu";

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function ViewCategory() {
  const { id } = useParams() as { id: string };

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/product-categories/${id}`);
        setCategory(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Erro ao buscar categoria:", err.response?.data || err.message);
        setError("Não foi possível carregar a categoria.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <div>
      <Menu />
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {category && (
        <div>
          <h1>Detalhes da Categoria</h1>
          <p>ID: {category.id}</p>
          <p>Nome da Categoria: {category.name}</p>
          <p>Criado em: {new Date(category.createdAt).toLocaleString()}</p>
          <p>Atualizado em: {new Date(category.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
