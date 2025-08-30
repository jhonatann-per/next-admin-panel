// src/app/product-situations/[id]/styles.ts
import styled from "styled-components"

export const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Arial, sans-serif;
`

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 22px;
`

export const Loading = styled.p`
  text-align: center;
  font-size: 16px;
  color: #666;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #222;
  font-size: 15px;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`

export const Button = styled.button<{ disabled?: boolean }>`
  padding: 12px;
  border-radius: 6px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "#999" : "#4caf50")};
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#999" : "#45a049")};
  }
`
