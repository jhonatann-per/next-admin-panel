// src/app/situations/ListPage.tsx
"use client";

import { useEffect, useState } from "react";
import instance from "@/services/api";
import { Menu } from "@/components/Menu";
import { Paginate } from "@/components/Paginate";
import Link from "next/link";
import { 
  Container, 
  Title, 
  Table, 
  Thead, 
  TrHead, 
  Th, 
  Tbody, 
  Tr, 
  Td 
} from "./styles";
import { Button } from "@/components/Button";
import { ButtonDelete } from "@/components/ButtonDelete";

interface Situation {
  id: number;
  nameSituation: string;
  createdAt: string;
  updatedAt: string;
}

const ListPage = () => {
  const [situations, setSituations] = useState<Situation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await instance.get(`/situations?page=${page}&limit=5`);
      console.log("Dados recebidos do back-end:", response.data.data);
      setSituations(response.data.data);
      setCurrentPage(response.data.currentPage);
      setLastPage(response.data.lastPage);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar situações: ", error);
      setError("Erro ao buscar situações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <Container>
      <Menu />
      <Title>Lista de Situações</Title>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <Table>
          <Thead>
            <TrHead>
              <Th>ID</Th>
              <Th>Nome da Situação</Th>
              <Th>Criado em</Th>
              <Th>Atualizado em</Th>
              <Th>Ações</Th>
            </TrHead>
          </Thead>
          <Tbody>
            {situations.map((situation) => (
              <Tr key={situation.id}>
                <Td>{situation.id}</Td>
                <Td>{situation.nameSituation}</Td>
                <Td>{new Date(situation.createdAt).toLocaleString()}</Td>
                <Td>{new Date(situation.updatedAt).toLocaleString()}</Td>
                <Td>
                  <Link href={`/situations/visualization/${situation.id}`}>
                    <Button variant="view">Visualizar</Button>
                  </Link>{" "}
                  <Link href={`/situations/edit/${situation.id}`}>
                    <Button variant="edit">Editar</Button>
                  </Link>{" "}
                  <ButtonDelete
                    endPoint="/situations"
                    id={situation.id}
                    onSuccess={() => fetchData(currentPage)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Paginate
        currentPage={currentPage}
        lastPage={lastPage}
        handlePageChange={setCurrentPage}
      />
    </Container>
  );
};

export default ListPage;
