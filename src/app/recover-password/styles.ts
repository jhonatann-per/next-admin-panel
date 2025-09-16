import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6bff8b3f, #00ff0052);
`;

export const LoginBox = styled.div`
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #000;
  &:focus {
    outline: none;
    border-color: #6b73ff;
    box-shadow: 0 0 5px rgba(107, 115, 255, 0.5);
  }
`;

export const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  background: #6b73ff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
  &:hover {
    background: #88e65cff;
  }
  &:disabled {
    background: #a0a6ff;
    cursor: not-allowed;
  }
`;

export const Message = styled.p<{ type?: "error" | "success" }>`
  color: ${({ type }) => (type === "error" ? "#ff4d4f" : "#52c41a")};
  margin-bottom: 1rem;
`;
export const RecoverPasswordButton = styled.button`
  margin-top: 10px;
  background: transparent;
  color: #000000ff;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #6b73ff;
  }
`;
