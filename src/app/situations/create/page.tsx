'use client';
import instance from "@/services/api";
import { useState, FormEvent } from "react";

interface Situation {
    nameSituation: string;
}

export default function CreateSituation() {
    const [situationPost, setSituationPost] = useState<Situation>({ nameSituation: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");   
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Função para extrair a primeira mensagem de erro
    const extractErrorMessage = (error: any): string => {
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (Array.isArray(data.message)) return data.message[0];
            if (typeof data.message === "string") return data.message;
        }
        return "Erro de conexão com o servidor.";
    };

    const handleSubmitCreateSituation = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await instance.post("/situations", situationPost);
            setSuccessMessage(response.data.message || "Situação criada com sucesso!");
            setSituationPost({ nameSituation: "" });
        } catch (error: any) {
            console.error("Failed to create situation:", error);
            setErrorMessage(extractErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmitCreateSituation}>
                <div>
                    <label htmlFor="nameSituation">Nome:</label>
                    <input
                        type="text"
                        name="nameSituation"
                        value={situationPost.nameSituation}
                        onChange={(e) =>
                            setSituationPost({ ...situationPost, nameSituation: e.target.value })
                        }
                        required
                        minLength={5}
                    />
                    <small>Mínimo 5 caracteres</small>
                </div>

                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Criando..." : "Criar"}
                </button>
            </form>
        </div>
    );
}
