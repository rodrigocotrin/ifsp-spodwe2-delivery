import { NavLink } from 'react-router-dom';

export default function Navegacao() {
  return (
    <nav className="navegacao">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
        Início
      </NavLink>
      <NavLink to="/restaurantes" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
        Restaurantes
      </NavLink>
      <NavLink to="/pratos" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
        Menu (CRUD)
      </NavLink>
    </nav>
  );
}