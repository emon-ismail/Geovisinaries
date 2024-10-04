import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Overview = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="rounded-lg bg-white py-5 px-5">
        <h3 className="text-dark text-3xl pb-5 ">Overview</h3>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className=" rounded-lg shadow-md overflow-hidden">
              <iframe
                className="w-full"
                style={{ height: '250px' }}
                src="https://www.youtube.com/embed/VIDEO_ID_1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-blue-600 rounded-lg shadow-md overflow-hidden">
              <iframe
                className="w-full"
                style={{ height: '250px' }}
                src="https://www.youtube.com/embed/VIDEO_ID_2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="bg-blue-600 rounded-lg shadow-md overflow-hidden">
              <iframe
                className="w-full"
                style={{ height: '250px' }}
                src="https://www.youtube.com/embed/VIDEO_ID_2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-blue-600 rounded-lg shadow-md overflow-hidden">
              <iframe
                className="w-full"
                style={{ height: '250px' }}
                src="https://www.youtube.com/embed/VIDEO_ID_3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Overview;
