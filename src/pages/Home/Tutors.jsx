import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import TutorCard from "../../components/TutorCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 1. Import Autoplay module
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";

const Tutors = () => {
  const axiosNormal = useAxiosNormal();
  const { data: tutors = [] } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const result = await axiosNormal.get("/tutors?limit=5");
      return result.data;
    },
  });

  return (
    <section className="py-10 px-5 max-w-7xl mx-auto">
      <h2 className="text-4xl text-primary font-bold text-center mb-10">Our Tutors</h2>
      <div className="w-fit ml-auto mb-5">
        <Link to='/all-tutors' className="btn btn-primary">View All</Link>
      </div>
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
        {tutors.map((tutor) => (
          <SwiperSlide key={tutor._id} className="h-auto!">
            <TutorCard tutor={tutor}></TutorCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Tutors;
