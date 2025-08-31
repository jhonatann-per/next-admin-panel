import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
  color: #333; 
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  color: #000;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 4px rgba(0, 112, 243, 0.4);
  }
`;

export const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: #0070f3;
  color: #fff;
  font-size: 15px;
  font-weight: 600; 
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #005bb5;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 6px;
`;

export const SuccessText = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 12px;
`;
