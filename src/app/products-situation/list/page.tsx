'use client'
import { useState, useEffect } from "react"
import instance from "@/services/api"
import { Menu } from "@/components/Menu"

interface Situation {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export default function ProductSituation() {
    const [situationsProduct, setSituationsProduct] = useState<Situation[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchProductSituation = async () => {
        try {
            const response = await instance.get("/product-situations")
            setSituationsProduct(response.data.data)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() =>{
        fetchProductSituation()
    }, [])

    return (
  <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <Menu />
    <h1>Product Situation</h1>
    {loading && <p>Loading...</p>}

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <thead>
        <tr>
          <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Created At</th>
          <th style={{ padding: "12px", textAlign: "left" }}>Updated At</th>
        </tr>
      </thead>

      <tbody>
        {situationsProduct.map((situation) => (
          <tr key={situation.id}>
            <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{situation.id}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{situation.name}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              {new Date(situation.createdAt).toLocaleDateString()}
            </td>
            <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              {new Date(situation.updatedAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}