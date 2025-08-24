'use client'
import { useState, FormEvent } from "react";
import instance from "@/services/api"
import { Menu } from "@/components/Menu";
interface PostCategory {
    name: string;
}

interface ApiError {
    message?: string;
    errors?: string[];
}

export default function CreateCategory() {
    const [categoryPost, setCategoryPost] = useState<PostCategory>({
        name: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmitCreateCategory = async (e: FormEvent) => {
        e.preventDefault(); 
        setLoading(true);
        setErrorMessage(null);
        setSuccess(false);
        
        try {
            const response = await instance.post("/product-categories", categoryPost)
            console.log("Categoria criada com sucesso:", response.data);
            setSuccess(true);
            setCategoryPost({ name: "" });
        } catch (error: any) {
            console.error("Erro ao criar categoria:", error);
            
            // Tratamento específico para diferentes tipos de erro
            if (error.response?.data) {
                const errorData: ApiError = error.response.data;
                
                // Erro de validação do Yup (múltiplos erros)
                if (errorData.errors && Array.isArray(errorData.errors)) {
                    setErrorMessage(errorData.errors.join(', '));
                } 
                // Erro de duplicidade ou outro erro específico
                else if (errorData.message) {
                    setErrorMessage(errorData.message);
                }
               
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Menu />
            <h1>Criar Categoria</h1>
            <form onSubmit={handleSubmitCreateCategory}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={categoryPost.name} 
                        onChange={(e) => setCategoryPost({ ...categoryPost, name: e.target.value })}
                        required
                        minLength={5}
                    />
                    <small>Mínimo 5 caracteres</small>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Criando..." : "Criar"}
                </button>
            </form>

            {success && <p style={{ color: "green" }}>Categoria criada com sucesso!</p>}
            {errorMessage && (
                <div style={{ color: "red", marginTop: "10px" }}>
                    <strong>Erro:</strong> {errorMessage}
                </div>
            )}
        </div>
    )
}