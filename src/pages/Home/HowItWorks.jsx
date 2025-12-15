import React from "react";
import styled from "styled-components";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Post Your Tuition Requirement",
      description:
        "Students register an account and easily publish a new tuition post. Fill out the form with details like the required subject, class, location, schedule, and budget.",
    },
    {
      id: 2,
      title: "Review, Apply, and Approve",
      description:
        "Qualified Tutors browse available posts and submit applications. Students review qualifications and salary, then approve the best fit by completing the payment.",
    },
    {
      id: 3,
      title: "Start Your Tuition",
      description:
        "With an approved tutor, the tuition is active. The platform enables digital class tracking, structured communication, and transparent financial monitoring.",
    },
  ];

  return (
    <SectionWrapper className="bg-base-200 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-3">How It Works</h2>
          <p className="text-neutral/70 text-lg">
            Get started with eTuitionBD in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step) => (
            <CardWrapper key={step.id}>
              <div className="neumorphic-card">
                <div className="step-indicator">
                  <span className="text-2xl font-bold text-secondary">
                    0{step.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral mb-4">
                  {step.title}
                </h3>
                <p className="text-neutral/70 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </CardWrapper>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

// --- STYLED COMPONENTS ---

const SectionWrapper = styled.section`
  /* Inherits bg-base-200 (#edf2f7) via the className */
  padding: 80px 0;
  /* Ensure this matches your section spacing rule */
  margin-top: 100px;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;

  .neumorphic-card {
    width: 100%;
    min-height: 320px;
    padding: 2.5rem 2rem;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;

    /* CRITICAL: Neumorphism adapted for your #edf2f7 (base-200) background.
      - Light shadow: Pure white (#ffffff)
      - Dark shadow: A cool grey (#d1d9e6) to match your blue-ish tone
    */
    background: #edf2f7;
    box-shadow: 10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff;
  }

  .neumorphic-card:hover {
    transform: translateY(-8px);
  }

  .step-indicator {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;

    /* Inset shadow gives the "pressed" button look */
    background: #edf2f7;
    box-shadow: inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff;
  }
`;

export default HowItWorks;
