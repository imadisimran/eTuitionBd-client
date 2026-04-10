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
  padding: 80px 0;
  margin-top: 100px;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;

  /* Define Neumorphic variables. 
    Defaults to Light Mode colors.
  */
  --neu-bg: var(--color-base-200, #edf2f7);
  --neu-shadow-light: #ffffff;
  --neu-shadow-dark: #d1d9e6;

  /* Dark Mode Overrides.
    This targets DaisyUI's dark theme attribute and standard OS dark mode.
  */
  :global([data-theme="dark"]) &,
  @media (prefers-color-scheme: dark) {
    --neu-shadow-light: rgba(255, 255, 255, 0.03);
    --neu-shadow-dark: rgba(0, 0, 0, 0.5);
  }

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

    background: var(--neu-bg);
    /* Removed the negative offset light shadow to eliminate the white glow */
    box-shadow: 1px 1px 10px var(--neu-shadow-dark);
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

    background: var(--neu-bg);
    /* Kept the light shadow here as an inset so the step circle retains its 3D depth */
    box-shadow:
      inset 5px 5px 10px var(--neu-shadow-dark),
      inset 5px 5px 10px var(--neu-shadow-light);
  }
`;

export default HowItWorks;
