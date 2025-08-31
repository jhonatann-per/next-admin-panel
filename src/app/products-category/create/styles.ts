// src/app/categories/styles.ts
import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #000;
  font-family: Arial, sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
  }

  small {
    color: #666;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  color: #000;

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px 16px;
  background-color: #0070f3;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #005bb5;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const SuccessText = styled.p`
  color: green;
  font-size: 1rem;
  margin-top: 12px;
`;
