"use client";

import instance from "@/services/api";
import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Title, Form, FormGroup, Label, Input, Button, Loading } from "./styles";

export default function EditPorductSituation() {
    const { id } = useParams() as {id: string};
    const [productSituationName, setProductSituationName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    
   const fetchProductSituation = async(id: string) => {
    try{
        setLoading(true);
        const response = await instance.get(`/product-situations/${id}`)
        const data = response.data;
        setProductSituationName(data.name);
    }catch(error){
        console.error("Erro ao buscar situação do produto", error);
    }finally{
        setLoading(false);
    }
   }

   useEffect(() =>{
    fetchProductSituation(id as string);
   },[id])

   const handleEditProductSituation = async(e: FormEvent) => {
    e.preventDefault();
    try {
        const response = await instance.put(`/product-situations/${id}`, {name: productSituationName});
        if(response.status === 200){
            alert("Situação do produto atualizada com sucesso");
            router.push("/products-situation/list");
        }
        console.log("Situação do produto atualizada com sucesso", response.data);
    } catch (error) {
        console.error("Erro ao atualizar situação do produto", error);
    }

   }

    return(
    <Container>
        <Title>Editar Situação do Produto</Title>
        {loading ? (<Loading>Carregando...</Loading>) : (
            <Form>
            <FormGroup>
                <Label htmlFor="name">Nome Da Situação do Produto</Label>
                <Input 
                    type="text" 
                    id="name"
                    value={productSituationName} 
                    onChange={(e) => setProductSituationName(e.target.value)}
                />
            </FormGroup>
            <Button onClick={handleEditProductSituation}>Salvar</Button>
        </Form>
        )}
        
        

    </Container>
)}
