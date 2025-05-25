import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { PostsData } from "../../constants/index";
import CoopersIcon from "../../assets/icone-coopers.svg";

export function PostSlider() {
  const paginationRef = useRef(null);
  const [paginationEl, setPaginationEl] = useState(null);

  useEffect(() => {
    if (paginationRef.current) {
      setPaginationEl(paginationRef.current);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center overflow-visible px-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          // tablet e acima
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          // desktop e acima
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        freeMode={false}
        loop={true}
        modules={[FreeMode, Pagination]}
        pagination={{
          el: paginationEl,
          clickable: true,
          renderBullet: (idx, className) => `<span class="${className}"></span>`,
        }}
        className="w-full max-w-[90%] lg:max-w-[80%] mx-auto"
      >
        {PostsData.map((post) => (
          <SwiperSlide key={post.id} className="p-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md cursor-grab flex flex-col min-h-[26rem]">
              <div className="relative w-full h-48">
                <img
                  src={post.image}
                  alt={post.text}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-4 translate-y-1/2">
                  <img
                    src={CoopersIcon}
                    alt=""
                    aria-hidden="true"
                    width={30}
                  />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <span className="inline-block px-3 py-1 border border-gray-400 rounded-full text-gray-600 text-xs font-medium self-start">
                  {post.category}
                </span>
                <h3 className="mt-4 text-md font-semibold text-gray-800 leading-snug">
                  {post.text}
                </h3>
                <a
                  href={post.link || "#"}
                  className="mt-6 inline-block text-green-500 font-semibold hover:underline"
                >
                  {post.link || "read more"}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        ref={paginationRef}
        className="swiper-pagination flex justify-center space-x-3 mt-6"
      />
    </div>
  );
}
