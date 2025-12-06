import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import heroImg1 from "../../assets/hero1.png";
import heroImg2 from "../../assets/hero2.png";
import heroImg3 from "../../assets/hero3.png";

const HeroSection = () => {
  return (
    <section>
      <Carousel infiniteLoop={true} autoPlay={true} interval={2500} stopOnHover={true}>
        <div className="bg-linear-to-br from-teal-50 to-orange-50 rounded-3xl">
          <div
            style={{ backgroundImage: `url(${heroImg1})`}}
            className="min-h-[450px] bg-contain bg-no-repeat bg-right flex items-center pl-20"
          >
            <h1 className="text-5xl/relaxed text-primary text-left font-bold">
              Master Your
              <br />
              Grades
            </h1>
          </div>
        </div>
        <div className="bg-linear-to-br from-teal-50 to-orange-50 rounded-3xl">
          <div
            style={{ backgroundImage: `url(${heroImg2})`}}
            className="min-h-[450px] bg-contain bg-no-repeat bg-right flex items-center pl-20"
          >
            <h1 className="text-5xl/relaxed text-primary text-left font-bold">
             Progress With Our
              <br />
              Wonderful Tutors
            </h1>
          </div>
        </div>
        <div className="bg-linear-to-br from-teal-50 to-orange-50 rounded-3xl">
          <div
            style={{ backgroundImage: `url(${heroImg3})`}}
            className="min-h-[450px] bg-contain bg-no-repeat bg-right flex items-center pl-20"
          >
            <h1 className="text-5xl/relaxed text-primary text-left font-bold">
             Tutors Available In
              <br />
              Every Corner Of
              <br />
              Bangladesh
            </h1>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSection;
