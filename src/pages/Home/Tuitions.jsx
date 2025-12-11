import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import TuitionCard from "../../components/TuitionCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 1. Import Autoplay module
import { Pagination, Autoplay } from "swiper/modules";

const Tuitions = () => {
  const axiosNormal = useAxiosNormal();
  const { data: tuitions = [] } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const result = await axiosNormal.get("/tuitions?status=approved");
      return result.data;
    },
  });

  return (
    <section className="py-10 px-5 max-w-7xl mx-auto">
      <Swiper
        // 2. Enable Infinite Loop
        loop={true}
        // 3. Configure Autoplay
        autoplay={{
          delay: 1500, // Time in ms before next slide (2.5 seconds)
          disableOnInteraction: false, // Continue autoplay after user swipes manually
          pauseOnMouseEnter: true, // PAUSE ON HOVER (This is what you asked for)
        }}
        slidesPerView={1}
        spaceBetween={20}
        // Pagination config
        pagination={{
          clickable: true,
          dynamicBullets: true, // Optional: Makes dots look cleaner if you have many slides
        }}
        // Responsive Breakpoints
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        // 4. Add Autoplay to modules
        modules={[Pagination, Autoplay]}
        className="mySwiper pb-12!"
      >
        {tuitions.map((tuition) => (
          <SwiperSlide key={tuition._id} className="h-auto!">
            <TuitionCard tuition={tuition}></TuitionCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Tuitions;
