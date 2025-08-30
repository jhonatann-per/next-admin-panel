// src/components/Button/index.tsx
import styled from "styled-components";
import React from "react";

// Tipagem do Button, estendendo props nativas de <button>
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "view" | "edit" | "delete";
};

// StyledButton usando theme e variant
const StyledButton = styled.button<{ variant: "view" | "edit" | "delete" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  margin: 0 4px;
  transition: opacity 0.2s;

  background-color: ${({ theme, variant }) =>
    variant === "view"
      ? theme.colors.view
      : variant === "edit"
      ? theme.colors.edit
      : theme.colors.delete};

  &:hover {
    opacity: 0.9;
  }
`;

export function Button({ children, variant = "view", ...props }: ButtonProps) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
