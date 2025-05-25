import heroImage from "../../assets/hero-image.jpg";
import backgroundHero from "../../assets/background-arrow.png";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="
        relative overflow-visible 
        min-h-[400px] md:min-h-[700px] 
        py-8
      "
    >
      {/* seta decorativa só em md+ */}
      <img
        src={backgroundHero}
        alt=""
        aria-hidden="true"
        className="
          hidden md:block
          absolute top-0 right-0
          w-[300px] md:w-[600px]
          pointer-events-none select-none
          z-10
        "
      />

      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between relative z-20">
        <div className="max-w-xl text-center md:text-left mt-8 md:mt-0">
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold leading-tight text-black"
          >
            Organize<br />
            <span className="text-green-500">your daily jobs</span>
          </h1>
          <p className="mt-6 text-lg text-black font-medium">
            The only way to get things done
          </p>
          <a
            href="#todo"
            className="
              inline-block mt-8
              bg-green-500 text-white font-semibold text-lg
              px-6 py-3 rounded-md
              hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300
              transition
            "
          >
            Go to To-do list
          </a>
        </div>

        {/* imagem só em md+ */}
        <div className="hidden md:block relative z-20 -mr-20 mb-8 md:mb-0">
          <img
            src={heroImage}
            alt="Ambiente de escritório moderno"
            className="w-full max-w-[420px] h-auto rounded-lg shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
