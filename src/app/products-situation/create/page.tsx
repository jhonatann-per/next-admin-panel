"use client"
import instance from "@/services/api"
import { FormEvent, useState } from "react"
import { AxiosError } from "axios"

interface PostProductSituation {
  name: string
}

export default function CreateProductSituation() {
  const [productSituation, setProductSituation] = useState<PostProductSituation>({ name: "" })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handlePostSituation = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const response = await instance.post("/product-situations", productSituation)

      setProductSituation({ name: "" }) 
      setSuccess(response.data.message) 

    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>
      if (error.response) {
        setError(error.response.data?.message || "Erro desconhecido do servidor")
      } else {
        setError("Erro de conexão com o servidor.")
      }
      console.error("Erro ao criar situação do produto:", error)
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handlePostSituation}>
        <h1>Criar Situação do Produto</h1>

        <label htmlFor="name">Nome da nova Situação</label>
        <input
          type="text"
          id="name"
          value={productSituation.name}
          onChange={(e) => setProductSituation({ name: e.target.value })}
          style={{ width: "100%", padding: "8px", marginTop: "4px", marginBottom: "12px" }}
        />

        <button type="submit" style={{ padding: "8px 16px" }}>Criar</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "12px" }}>{success}</p>}
    </div>
  )
}
