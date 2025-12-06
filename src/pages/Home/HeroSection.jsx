import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import heroImg1 from "../../assets/hero1.png";
import heroImg2 from "../../assets/hero2.png";
import heroImg3 from "../../assets/hero3.png";

const HeroSection = () => {
  return (
    <section className="mt-10! [&_br]:hidden md:[&_br]:inline [&_h1]:text-4xl/relaxed [&_h1]:text-center md:[&_h1]:text-5xl/relaxed">
      <Carousel infiniteLoop={true} autoPlay={true} interval={2500} stopOnHover={true} showThumbs={false}>
        
        {/* Slide 1 */}
        <div className="bg-linear-to-br from-teal-50 to-orange-50 rounded-3xl">
          <div
            style={{ "--bg-img": `url(${heroImg1})` }}
            // Added justify-center for mobile, justify-start for desktop
            className="min-h-[450px] bg-none md:bg-(image:--bg-img) bg-contain bg-no-repeat bg-right flex items-center justify-center md:justify-start"
          >
            <h1 className="text-5xl/relaxed text-primary text-left font-bold p-0 md:pl-20">
              Master Your
              <br />
              Grades
            </h1>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="bg-linear-to-br from-teal-50 to-orange-50 rounded-3xl">
          <div
            style={{ "--bg-img": `url(${heroImg2})` }}
            // CHANGED: Removed 'pl-20', added 'md:pl-20' and 'px-5' for mobile safety
            className="min-h-[450px] bg-none md:bg-(image:--bg-img) bg-contain bg-no-repeat bg-right flex items-center justify-center md:justify-start px-5 md:pl-20"
          >
            <h1 className="text-primary text-left font-bold p-0">
              Progress With Our
              <br /> Wonderful Tutors
            </h1>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="bg-linear-to-br from-teal-50 to-orange-50 rounded-3xl">
          <div
            style={{ "--bg-img": `url(${heroImg3})` }}
            // CHANGED: Removed 'pl-20', added 'md:pl-20' and 'px-5' for mobile safety
            className="min-h-[450px] bg-none md:bg-(image:--bg-img) bg-contain bg-no-repeat bg-right flex items-center justify-center md:justify-start px-5 md:pl-20"
          >
            <h1 className="text-5xl/relaxed text-primary text-left font-bold p-0">
              Tutors Available In <br />
              Every Corner Of <br />
              Bangladesh
            </h1>
          </div>
        </div>

      </Carousel>
    </section>
  );
};

export default HeroSection;