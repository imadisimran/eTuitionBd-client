import React from "react";
import boy from "../../assets/boy.png";
import profile from "../../assets/profile.png";

const HowItWorks = () => {
  return (
    <section className="grid grid-cols-3">
      <div className="px-5 h-[300px] flex flex-col justify-between">
        <div>
          <h2 className="text-neutral text-3xl font-bold">
            1. Post Requirements
          </h2>
          <p className="text-gray-600">
            Post requirements to find your desired tutor.
          </p>
        </div>
        <img
          src={boy}
          className="w-full h-[200px] object-cover"
          alt="Cartoon Boy"
        />
      </div>
      <div className=" h-[300px] space-y-5">
        <h2 className="text-neutral text-3xl font-bold">2. Get Matches</h2>
        <div className="px-5 flex gap-5 items-center">
          <img className="w-[70px]" src={profile} alt="Profile Image" />
          <div>
            <h4>Name</h4>
            <p>Subject</p>
          </div>
        </div>
        <div className="px-5 flex gap-5 items-center">
          <img className="w-[70px]" src={profile} alt="Profile Image" />
          <div>
            <h4>Name</h4>
            <p>Subject</p>
          </div>
        </div>
        <div className="px-5 flex gap-5 items-center">
          <img className="w-[70px]" src={profile} alt="Profile Image" />
          <div>
            <h4>Name</h4>
            <p>Subject</p>
          </div>
        </div>
      </div>
      <div className="px-5 h-[300px]">
        <h2 className="text-3xl font-bold text-neutral">
          Hire And Pay Securely
        </h2>
      </div>
    </section>
  );
};

export default HowItWorks;
