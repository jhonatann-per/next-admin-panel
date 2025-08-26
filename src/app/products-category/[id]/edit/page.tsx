'use client'

import { useState, useEffect, FormEvent } from "react"
import { useParams, useRouter } from "next/navigation"
import instance from "@/services/api"

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
    <div style={{
      maxWidth: "500px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Editar Categoria</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Carregando...</p>
      ) : (
        <form onSubmit={handleEditCategory}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#0e0d0d" }}>
              Nome da Categoria:
            </label>
            <input
              type="text"
              id="name"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
              disabled={save}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #030303",
                fontSize: "16px",
                color: "#333"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={save}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: save ? "#999" : "#4caf50",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: save ? "not-allowed" : "pointer",
              transition: "background-color 0.3s"
            }}
          >
            {save ? "Salvando..." : "Salvar"}
          </button>
        </form>
      )}
    </div>
  )
}
