import heroImage from "../../assets/hero-image.jpg";
import backgroundHero from "../../assets/background-arrow.png";

export function Hero() {
    return (
        <section className="relative py-0 overflow-visible min-h-[700px]">
            {/* Seta decorativa — fora do container */}
            <img
                src={backgroundHero}
                alt="Seta decorativa"
                className="absolute top-0 right-0 w-[600px] z-10 pointer-events-none select-none"
            />


            {/* Conteúdo principal dentro do container */}
            <div className="container mx-auto flex items-center justify-between px-0 relative z-10">
                {/* Texto à esquerda */}
                <div className="max-w-xl pt-10">
                    <h1 className="text-5xl font-bold leading-tight text-black">
                        Organize <br />
                        <span className="text-green-500">your daily jobs</span>
                    </h1>
                    <h2 className="text-lg text-black mt-6 font-medium">
                        The only way to get things done
                    </h2>
                    <a
                        href="#"
                        className="inline-block mt-8 bg-green-500 text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-green-600 transition"
                    >
                        Go to To-do list
                    </a>
                </div>

                {/* Imagem à direita — parcialmente sobre a seta */}
                <div className="relative z-10 -mr-20 drop-shadow-xl">
                    <img
                        src={heroImage}
                        alt="Office"
                        className="rounded-lg object-cover w-[420px] h-[420px]"
                    />
                </div>
            </div>
        </section>
    );
}
