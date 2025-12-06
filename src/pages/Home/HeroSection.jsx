import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import heroImg1 from "../../assets/hero.png";

const HeroSection = () => {
  return (
    <section className="">
      <Carousel>
        <div className="bg-linear-to-br from-teal-50 to-orange-50 rounded-3xl">
          <div
            style={{ backgroundImage: `url(${heroImg1})`}}
            className="min-h-[400px] bg-contain bg-no-repeat bg-right flex items-center pl-20"
          >
            <h1 className="text-5xl/relaxed text-primary text-left font-bold">
              Master Your
              <br />
              Grades
            </h1>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSection;
