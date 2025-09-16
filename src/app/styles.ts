"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  opacity: 0.9;
`;

export const Button = styled.button`
  background: white;
  color: #4f46e5;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e5e7eb;
  }
`;
