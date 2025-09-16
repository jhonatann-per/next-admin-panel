// src/app/product-situations/styles.ts
import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
 padding: 1rem;
  color: #f7f7f7;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Thead = styled.thead``;

export const TrHead = styled.tr`
  background-color: #0e0d0d;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;

  &:last-child {
    text-align: center;
  }
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const Td = styled.td<{ center?: boolean }>`
  padding: 10px;
  text-align: ${({ center }) => (center ? "center" : "left")};
`;
