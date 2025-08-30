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
`

export const Loading = styled.p`
  text-align: center;
`

export const Form = styled.form``

export const FormGroup = styled.div`
  margin-bottom: 20px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #0e0d0d;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #030303;
  font-size: 16px;
  color: #333;
`

export const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "#999" : "#4caf50")};
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;
`
