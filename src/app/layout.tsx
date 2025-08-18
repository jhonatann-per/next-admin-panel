/**
 * ROOT LAYOUT - LAYOUT RAIZ DA APLICAÇÃO
 * 
 * Este é o componente de layout principal que envolve TODAS as páginas do seu projeto Next.js.
 * 
 * O QUE ELE FAZ:
 * 1. Define a estrutura HTML básica (<html>, <body>) para toda a aplicação
 * 2. Carrega configurações globais como:
 *    - Metadados padrão (SEO/título/descrição)
 *    - Fontes otimizadas (Geist e Geist Mono)
 *    - Estilos globais (globals.css)
 * 3. Serve como container para todas as páginas (recebidas como children)
 * 
 * IMPORTANTE:
 * - Este arquivo é OBRIGATÓRIO no App Router do Next.js (v13+)
 * - Substitui os antigos _app.js e _document.js
 * - Qualquer elemento aqui será mostrado em TODAS as páginas
 * - Metadados podem ser sobrescritos em páginas específicas
 * 
 * ADICIONE AQUI:
 * - Providers globais (Theme, Auth, etc)
 * - Contextos globais
 * - Elementos que aparecem em todas as páginas (como Header/Footer)
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jhonatan!",
  description: "Sistema administrativo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}