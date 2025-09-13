import styled from "styled-components";

export const Container = styled.nav`
  width: 100%;
  background: #111827;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Menu Desktop */
export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  a {
    text-decoration: none;
    color: #e5e7eb;
    font-weight: 500;
    transition: color 0.3s ease, transform 0.2s ease;
    &:hover {
      color: #3b82f6;
      transform: translateY(-2px);
    }
  }
`;

export const LogoutButton = styled.button`
  margin-left: auto;
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: scale(1.05);
  }
`;

/* Botão hamburguer animado */
export const Burger = styled.div<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  cursor: pointer;
  z-index: 20; /* fica na frente do menu */

  span {
    width: 100%;
    height: 3px;
    background: #e5e7eb;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
    transform-origin: center;
  }

  /* Animação para virar X */
  span:nth-child(1) {
    transform: ${({ $open }) => ($open ? "rotate(45deg) translateY(8px)" : "rotate(0)")};
  }

  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? "0" : "1")};
  }

  span:nth-child(3) {
    transform: ${({ $open }) => ($open ? "rotate(-45deg) translateY(-8px)" : "rotate(0)")};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

/* Menu Mobile */
export const MobileMenu = styled.ul<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    position: absolute;
    top: 70px;
    right: 0;
    background: #1f2937;
    padding: 1.5rem;
    width: 220px;
    border-radius: 0 0 0 12px;
    box-shadow: -2px 2px 10px rgba(0,0,0,0.3);
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(110%)")};
    transition: transform 0.3s ease-in-out;

    ${LogoutButton} {
      margin-left: 0;
    }
  }
`;
