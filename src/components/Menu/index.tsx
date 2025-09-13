"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Container,
  NavList,
  NavItem,
  LogoutButton,
  Burger,
  MobileMenu,
} from "./styles";

const links = [
  { href: "/", label: "Home" },
  { href: "/products-category/list", label: "Category" },
  { href: "/products-situation/list", label: "Produtos" },
  { href: "/situations/list", label: "Situations" },
  { href: "/contact", label: "Contact" },
];

export const Menu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Container>
      <Burger $open={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Burger>

      {/* Desktop */}
      <NavList>
        {links.map((link) => (
          <NavItem key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </NavItem>
        ))}
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </NavList>

      {/* Mobile */}
      <MobileMenu $open={open}>
        {links.map((link) => (
          <NavItem key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </NavItem>
        ))}
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </MobileMenu>
    </Container>
  );
};
