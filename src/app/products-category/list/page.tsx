'use client'

import { useState, useEffect } from "react"
import instance from "@/services/api"
import { Menu } from "@/components/Menu"
import Link from "next/link"
import { Paginate } from "@/components/Paginate"

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

  // ❌ Seu erro anterior: fetchCategories não recebia parâmetro
  // ✅ Correção: agora a função recebe a página que queremos buscar
  const fetchCategories = async (page: number = 1) => {
    try {
      setLoading(true)

      // ✅ Usando o parâmetro page passado para a função
      const response = await instance.get(`/product-categories?page=${page}`)

      // Atualizando os estados com os dados retornados
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

  // ❌ Seu erro anterior: chamava fetchCategories(currentPage) mas a função não aceitava parâmetro
  // ✅ Correção: agora aceita e o useEffect dispara sempre que currentPage mudar
  useEffect(() => { 
    fetchCategories(currentPage)
  }, [currentPage]) // 🔹 Importante: [currentPage] faz a lista atualizar ao clicar na paginação

  // Renderizando loading ou erro
  if (loading) return <div><Menu /><p>Carregando...</p></div>
  if (error) return <div><Menu /><p>{error}</p></div>

  return ( 
  <div>
    <Menu />
    <h1>Categoria de produtos</h1>
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px"
    }}>
      <thead>
        <tr style={{ backgroundColor: "#0e0d0d" }}>
          <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>ID</th>
          <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Nome</th>
          <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Criado em</th>
          <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Atualizado em</th>
          <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px" }}>{category.id}</td>
            <td style={{ padding: "10px" }}>{category.name}</td>
            <td style={{ padding: "10px" }}>{new Date(category.createdAt).toLocaleString()}</td>
            <td style={{ padding: "10px" }}>{new Date(category.updatedAt).toLocaleString()}</td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {/* 🔹 Botões de ação por item */}
              <Link href={`/products-category/${category.id}`}>
                <button style={{ marginRight: "5px", padding: "5px 10px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Visualizar</button>
              </Link>
              <Link href={`/products-category/edit/${category.id}`}>
                <button style={{ marginRight: "5px", padding: "5px 10px", backgroundColor: "#2196f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Editar</button>
              </Link>
              <button 
                style={{ padding: "5px 10px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                // onClick={() => handleDeleteCategory(category.id)} // Você pode criar a função handleDeleteCategory
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* Paginate recebe o currentPage, lastPage e a função que muda a página */}
    {/* 🔹 Importante: handlePageChange = setCurrentPage, assim atualiza o estado */}
    <Paginate 
      currentPage={currentPage} 
      lastPage={lastPage} 
      handlePageChange={setCurrentPage} 
    />
  </div>
)

}

export default ProductsCategory
