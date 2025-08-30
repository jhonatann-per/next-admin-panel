"use client";

import { useState, useEffect } from "react";
import instance from "@/services/api";
import { Menu } from "@/components/Menu";
import { Button } from "@/components/Button";
import { ButtonDelete } from "@/components/ButtonDelete";
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

interface Situation {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProductSituation() {
  const [situationsProduct, setSituationsProduct] = useState<Situation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProductSituation = async () => {
    try {
      const response = await instance.get("/product-situations");
      setSituationsProduct(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductSituation();
  }, []);

  return (
    <Container>
      <Menu />
      <Title>Product Situation</Title>

      {loading && <p>Loading...</p>}

      {!loading && (
        <Table>
          <Thead>
            <TrHead>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Criado Em</Th>
              <Th>Atualizado Em</Th>
              <Th>Ações</Th>
            </TrHead>
          </Thead>

          <Tbody>
            {situationsProduct.map((situation) => (
              <Tr key={situation.id}>
                <Td>{situation.id}</Td>
                <Td>{situation.name}</Td>
                <Td>{new Date(situation.createdAt).toLocaleString()}</Td>
                <Td>{new Date(situation.updatedAt).toLocaleString()}</Td>
                <Td>
                  <Link href={`/products-situation/visualization/${situation.id}`}>
                  <Button variant="view">Visualizar</Button>
                </Link>
                <Link href={`/products-situation/edit/${situation.id}`}>
                  <Button variant="edit" >Editar</Button>
                </Link>
                  <ButtonDelete
                    endPoint="/product-situations"
                    id={situation.id}
                    onSuccess={fetchProductSituation}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
}
