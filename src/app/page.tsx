"use client";
import Link from "next/link";
import { Container, Header, Content, Title, Description, Button } from "./styles";

export default function Home() {
  return (
    <Container>
      <Header>
        <Link href="/login">
          <Button>Acessar o Painel</Button>
        </Link>
      </Header>

      <Content>
        <Title>Bem-vindo ao Painel de Cadastro</Title>
        <Description>
          Gerencie seus produtos e situações de forma simples e rápida.  
          Controle total do seu estoque e relatórios em tempo real, tudo em um só lugar.
        </Description>
      </Content>
    </Container>
  );
}
