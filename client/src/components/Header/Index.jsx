import logo from "../../assets/coopers-logo.svg";

export function Header({ onLogin }) {
    return (
        <header className="container mx-auto flex justify-between items-center py-20 relative z-20">
            <a href="/">
                <img src={logo} alt="Logo" className="h-10" />
            </a>
            <button
                onClick={onLogin}
                className="bg-black cursor-pointer text-white px-8 py-2 rounded hover:bg-gray-800 transition"
            >
                entrar
            </button>
        </header>
    );
}
