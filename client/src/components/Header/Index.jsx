import logo from "../../assets/coopers-logo.svg";

export function Header({ onLogin }) {
  return (
    <header
      className="container mx-auto px-4 py-6 flex items-center justify-between"
      role="banner"
    >
      {/* Logo com link semântico */}
      <a href="/" aria-label="Coopers home">
        <img src={logo} alt="Coopers logo" className="h-10 w-auto" />
      </a>

      {/* Botão de login com foco e contraste */}
      <button
        type="button"
        onClick={onLogin}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition cursor-pointer"
        aria-label="Entrar"
      >
        Entrar
      </button>
    </header>
  );
}
