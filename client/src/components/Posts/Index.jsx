import { PostSlider } from "../Slider/Index.jsx";

export function Posts() {
  return (
    <section
      id="good-things"
      aria-labelledby="good-things-heading"
      className="relative overflow-visible py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col items-center md:items-start">
          {/* fundo verde */}
          <div className="absolute -top-10 left-0 w-full md:w-3/4 h-[28rem] bg-green-400 rounded-lg" />

          {/* título */}
          <h2
            id="good-things-heading"
            className="relative z-10 text-4xl font-bold text-white mb-8 whitespace-nowrap self-center md:self-start md:left-44"
          >
            good things
          </h2>

          {/* slider vaza para baixo */}
          <div className="relative z-10 overflow-visible w-full">
            <PostSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
