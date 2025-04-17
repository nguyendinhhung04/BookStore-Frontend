import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export function AnnouncementSlider() {
    return (
        <>
            <Swiper
                centeredSlides={true}
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}

                style={{height: '450px'}}
            >
                <SwiperSlide>
                    <div className="container d-flex justify-content-center align-items-center" style={{maxHeight: '450px', maxWidth: '100%'}} >
                        <img className="mw-100 mh-100" src="https://bizweb.dktcdn.net/100/363/455/articles/484799317-1063744625793271-7677298375345374751-n.jpg?v=1742792125167" style={{ objectFit: 'contain'}} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container d-flex justify-content-center align-items-center" style={{maxHeight: '450px', maxWidth: '100%'}}>
                        <img className="mw-100 mh-100" src="https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-17-51a80241-426c-4785-b5e1-9aedf8dff8c0.png?v=1742197752157" style={{ objectFit: 'contain'}}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container d-flex justify-content-center align-items-center" style={{maxHeight: '450px', maxWidth: '100%'}}>
                        <img className="mw-100 mh-100" src="https://bizweb.dktcdn.net/100/363/455/articles/489006758-1079586880875712-661463280947496865-n.jpg?v=1744100699603" style={{ objectFit: 'contain'}}/>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}