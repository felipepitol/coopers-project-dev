import { Header } from "../components/Header/Index.jsx";
import { Hero } from "../components/Hero/Index.jsx";
import { Todo } from "../components/Todo/Index.jsx";
import { LoginModal } from "../components/LoginModal/Index.jsx";
import { useState } from "react";

export function Home() {

    const [showLogin, setShowLogin] = useState(false);

    function handleAuth({ email, password, type }) {
        console.log("Auth action:", type, email, password);
    }

    return (
        <div>
            <Header onLogin={() => setShowLogin(true)} />
            <Hero />
            <Todo />
            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onSubmit={handleAuth}
            />
        </div>
    );
}
