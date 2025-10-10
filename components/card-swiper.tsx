import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const nameOfFood = [
    "test1",
    "چلو جوجه با استخوان",
    "قفقازی",
    "چنجه گوسفندی",
    "چلوکباب شاه عباسی",
    "زرشک پلو با مرغ",
    "سینی مخصوص سرآشپز",
]

const ResponsiveCarousel: React.FC = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={18}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            className="flex justify-center items-center "
        >
            {[1, 2, 3, 4, 5, 6].map((n) => (
                <SwiperSlide
                    key={n}
                    className="group flex justify-center items-center relative"
                >
                    <Image
                        src={`/slide-items/item${n}.jpg`}
                        alt={`Slide ${n}`}
                        className="z-0 rounded-xl object-cover h-[200px] w-[360px] duration-150 group-hover:brightness-50"
                        height={300}
                        width={300}
                    />
                    <span className="absolute font-bold text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden group-hover:inline-block">
                        {nameOfFood[n]}
                    </span>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ResponsiveCarousel;