'use client'
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import instance from "@/services/api"

interface ProductSituation {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}


export default function ViewProductSituation(){
    const { id } = useParams() as { id: string };
    const [productSituation, setProductSituation] = useState<ProductSituation| null>(null)
    useEffect(() =>{
        const fetchProductSituation = async() =>{
            try{
                const response = await instance.get(`/product-situations/${id}`);
                setProductSituation(response.data);
            }catch(error){
                console.error("Erro ao buscar situação do produto", error);
            }
        }
        fetchProductSituation();
    }, [id])

    return(
        <div>
            {productSituation && (
                <div>
                    <h1>Detalhes da Situação do Produto</h1>
                    <p>ID: {productSituation.id}</p>
                    <p>Nome da Situação: {productSituation.name}</p>
                    <p>Criado em: {new Date(productSituation.createdAt).toLocaleString()}</p>
                    <p>Atualizado em: {new Date(productSituation.updatedAt).toLocaleString()}</p>
                </div>
            )}
        </div>
    )
} 

