import { useState } from "react";
import instance from "@/services/api";
import { Button } from "../Button"; 
interface DeleteButtonProps {
  endPoint: string;
  id: number | string;
  onSuccess?: () => void;
}

export const ButtonDelete = ({ endPoint, id, onSuccess }: DeleteButtonProps) => {
  const [loading, setLoading] = useState(false);


  const handleDeleteItem = async (id: number | string) => {
    if (confirm("Tem certeza que deseja deletar este item?")) {
      try {
        setLoading(true);
        await instance.delete(`${endPoint}/${id}`);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("Erro ao deletar item: ", error);
        alert("Erro ao deletar item");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button variant="delete" onClick={() => handleDeleteItem(id)} disabled={loading}>
      {loading ? "Deletando..." : "Deletar"}
    </Button>
  );
};
