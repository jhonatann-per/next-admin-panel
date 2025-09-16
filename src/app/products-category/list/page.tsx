"use client"

import { useState, useEffect } from "react"
import instance from "@/services/api"
import { Menu } from "@/components/Menu"
import Link from "next/link"
import { Paginate } from "@/components/Paginate"
import { ButtonDelete } from "@/components/ButtonDelete"
import {
  Container,
  Title,
  Table,
  Thead,
  TrHead,
  Th,
  Tbody,
  Tr,
  Td,
} from "./styles"
import { Button } from "@/components/Button"

// Interface para tipar a categoria
interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsCategory = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const fetchCategories = async (page: number = 1) => {
    try {
      setLoading(true)
      const response = await instance.get(`/product-categories?page=${page}`)
      setCategories(response.data.data)
      setCurrentPage(response.data.currentPage)
      setLastPage(response.data.lastPage)
      setError(null)
    } catch (error) {
      console.error("Erro ao buscar categorias de produtos: ", error)
      setError("Erro ao carregar categorias")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    fetchCategories(currentPage)
  }, [currentPage])

  if (loading) return <div><Menu /><p>Carregando...</p></div>
  if (error) return <div><Menu /><p>{error}</p></div>

  return (
      <Container>
      <Menu />
      <Title>Categoria de produtos</Title>

      <Table>
        <Thead>
          <TrHead>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Criado em</Th>
            <Th>Atualizado em</Th>
            <Th>Ações</Th>
          </TrHead>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>{category.id}</Td>
              <Td>{category.name}</Td>
              <Td>{new Date(category.createdAt).toLocaleString()}</Td>
              <Td>{new Date(category.updatedAt).toLocaleString()}</Td>
              <Td>
                <Link href={`/products-category/visualization/${category.id}`}>
                  <Button variant="view">Visualizar</Button>
                </Link>
                <Link href={`/products-category/edit/${category.id}`}>
                  <Button variant="edit">Editar</Button>
                </Link>
                <ButtonDelete endPoint="/product-categories" id={category.id} onSuccess={() => fetchCategories(currentPage)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Paginate 
        currentPage={currentPage} 
        lastPage={lastPage} 
        handlePageChange={setCurrentPage} 
      />
    </Container>
  )
}

export default ProductsCategory
