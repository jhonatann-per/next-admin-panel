'use client'
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
  const params = useParams(); 
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const id = params?.id;
  const categoryId = Array.isArray(id) ? id[0] : id;

  const fetchCategory = async (id: string) => {
    try {
      setLoading(true);
      const response = await instance.get(`/product-categories/${id}`);
      console.log("Resposta completa:", response); // Para debug
      console.log("Dados recebidos:", response.data); // Para debug
      setCategory(response.data);
      setError(null);
    } catch (error: any) {
      console.error("Erro ao buscar categoria:", error.response?.data || error.message);
      setError("Não foi possível carregar a categoria.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <div>
      {loading && <p>Carregando...</p>}
      <Menu />
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