import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export function BookSlider() {


    return (
        <>
            <Swiper
                slidesPerView={6}


            >
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
                <SwiperSlide>
                    <img width={150} height={200} src={"https://bizweb.dktcdn.net/100/363/455/products/nguoi-dan-ong-ay-01.jpg?v=1744097021527"} />
                </SwiperSlide>
            </Swiper>
        </>
    );
}