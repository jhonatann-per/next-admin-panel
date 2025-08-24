'use client'
import { useEffect, useState } from "react";
import instance from "@/services/api";
import { Menu } from "@/components/Menu";
import { Paginate } from "@/components/Paginate";
import Link from "next/link";

interface Situation{
    id: number;
    nameSituation: string;
    createdAt: string;
    updatedAt: string;
};

const ListPage =() => {
    // Lista de situações de produto da página atual
  const [situations, setSituations] = useState<Situation[]>([]);

  // Estado de carregamento: true enquanto os dados estão sendo buscados
  const [loading, setLoading] = useState<boolean>(true);

  // Estado de erro: guarda a mensagem de erro caso a requisição falhe
  const [error, setError] = useState<string | null>(null);

  // Página atual que está sendo exibida
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Última página disponível (retornada pelo backend)
  const [lastPage, setLastPage] = useState<number>(1);

  


    const fetchData = async(page: number) =>{
            try {
                const response = await instance.get(`/situations?page=${page}&limit=5`);
                setSituations(response.data.data);
                setCurrentPage(response.data.currentPage);
                setLastPage(response.data.lastPage);
            }catch(error){
                setError("Erro ao buscar situações");
                console.error("Erro ao buscar situações: ", error);
            } finally{
                setLoading(false);
            }
        }

    useEffect(()=>{
        fetchData(currentPage);
    },[currentPage])



    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Menu />
        <h1 style={{ marginBottom: "20px" }}>Lista de Situações</h1>

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>ID</th>
                <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Nome da Situação</th>
                <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {situations.map((situation) => (
                <tr key={situation.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{situation.id}</td>
                  <td style={{ padding: "10px" }}>{situation.nameSituation}</td>
                  <td style={{ padding: "10px" }}>
                    <Link href={`/situations/${situation.id}`}>Visualizar</Link>{` `}
                    <button style={{ marginRight: "5px" }}>Editar</button>
                    <button>Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Paginate currentPage={currentPage} lastPage={lastPage} handlePageChange={setCurrentPage} />
      </div>
  );
}
export default ListPage;