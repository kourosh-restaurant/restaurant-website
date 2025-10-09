import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const ResponsiveCarousel: React.FC = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            className="flex justify-between "
        >
            {[1, 2, 3, 4, 5, 6].map((n) => (
                <SwiperSlide key={n} className="h-[250px]">
                    <Image
                        src={`/slide-items/item${n}.jpg`}
                        alt={`Slide ${n}`}
                        className="rounded-xl object-cover h-[200px] w-[200px]"
                        height={300}
                        width={300}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ResponsiveCarousel;
