"use client"

import { useState, useEffect, FormEvent } from "react"
import { useParams, useRouter } from "next/navigation"
import instance from "@/services/api"
import { Container, Title, Loading, Form, FormGroup, Label, Input, Button } from "./styles"

export default function EditCategory() {
  const [nameCategory, setNameCategory] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [save, setSave] = useState<boolean>(false)
  const { id } = useParams()
  const router = useRouter()

  const fetchEditCategory = async (id: string) => {
    try {
      setLoading(true)
      const response = await instance.get(`/product-categories/${id}`)
      const data = response.data
      setNameCategory(data.name)
    } catch (error) {
      console.error("Erro ao buscar categoria:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchEditCategory(id as string)
  }, [id])

  const handleEditCategory = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setSave(true)
      await instance.put(`/product-categories/${id}`, { name: nameCategory })
      alert("Categoria editada com sucesso!")
      router.push("/products-category/list")
    } catch (error) {
      console.error("Erro ao editar categoria:", error)
      alert("Erro ao editar categoria.")
    } finally {
      setSave(false)
    }
  }

  return (
    <Container>
      <Title>Editar Categoria</Title>

      {loading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <Form onSubmit={handleEditCategory}>
          <FormGroup>
            <Label htmlFor="name">Nome da Categoria:</Label>
            <Input
              type="text"
              id="name"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
              disabled={save}
            />
          </FormGroup>

          <Button type="submit" disabled={save}>
            {save ? "Salvando..." : "Salvar"}
          </Button>
        </Form>
      )}
    </Container>
  )
}
