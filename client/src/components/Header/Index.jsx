// src/components/Header/Index.jsx
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/coopers-logo.svg";

export function Header({ onLogin }) {
  const { session, signOut } = useAuth();

  return (
    <header
      className="container mx-auto px-4 py-6 flex items-center justify-between"
      role="banner"
    >
      {/* logo */}
      <a href="/" aria-label="Coopers home">
        <img src={logo} alt="Coopers logo" className="h-10 w-auto" />
      </a>

      {/* login/logout */}
      {session ? (
        <button
          type="button"
          onClick={signOut}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          aria-label="Sair"
        >
          Sair
        </button>
      ) : (
        <button
          type="button"
          onClick={onLogin}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          aria-label="Entrar"
        >
          Entrar
        </button>
      )}
    </header>
  );
}
