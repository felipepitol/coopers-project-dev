import { Header } from "../components/Header/Index.jsx";
import { Hero } from "../components/Hero/Index.jsx";
import { Todo } from "../components/Todo/Index.jsx";
import { Posts } from "../components/Posts/Index.jsx";
import { Contact } from "../components/Contact/Index.jsx";
import { Footer } from "../components/Footer/Index.jsx";
import { LoginModal } from "../components/LoginModal/Index.jsx";
import { useState } from "react";

export function Home() {

    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            <Header onLogin={() => setShowLogin(true)} />
            <Hero />
            <Todo />
            <Posts />
            <Contact />
            <Footer />
            {/* Login Modal */}
            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}
