'use client'
import React from "react"

interface PaginationProps {
  currentPage: number;        // página atual
  lastPage: number;           // última página disponível
  handlePageChange: (page: number) => void; // função que recebe um número de página
}


export const Paginate = ({currentPage, lastPage, handlePageChange} : PaginationProps) =>{
    return(
        <div>
            <span style={{ marginRight: "5px", cursor: "pointer" }}  >{currentPage} de {lastPage}</span>
            <button 
                style={{ marginRight: "5px", cursor: "pointer" }} 
                onClick={()=> handlePageChange (currentPage -1)} 
                disabled={currentPage === 1}>Anterior
            </button>
            <button 
                style={{ marginLeft: "5px", cursor: "pointer" }}  
                onClick={()=> handlePageChange(currentPage + 1)} 
                disabled={currentPage === lastPage}>Próximo
            </button>
        </div>
    )
}