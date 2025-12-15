import React from "react";
import styled from "styled-components";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Verified Tutors & Guaranteed Tuition",
      description:
        "We tackle the core problem by ensuring only verified and qualified tutors are available and that all tuition posts are reviewed for authenticity.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Seamless Digital Workflows",
      description:
        "Automated processes for tuition posting, tutor application, and payment reduce friction. Students post quickly, and tutors apply via a dedicated flow.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Transparent Payment & Tracking",
      description:
        "Integrated Stripe payment ensures secure transactions. Students and Tutors can easily view their payment and revenue history with complete transparency.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Role-Specific Dashboards",
      description:
        "Dedicated dashboards for Students, Tutors, and Admins. Manage applications, track tuitions, and monitor analytics based on your specific role.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Advanced Search & Filtering",
      description:
        "Find the perfect match using powerful filters. Sort by budget, date, class, subject, and location to narrow down your options instantly.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Secure Authentication",
      description:
        "Secure, role-based access with flexible registration and Google Social Login. Your private data is protected and routed securely.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <SectionWrapper className="bg-base-200 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-3">
            Why Choose Us?
          </h2>
          <p className="text-neutral/70 text-lg">
            Empowering education with transparency and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.id}>
              <div className="card-content">
                <div className="icon-wrapper text-primary">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FeatureCard>
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

const FeatureCard = styled.div`
  display: flex;

  .card-content {
    width: 100%;
    padding: 2.5rem 2rem;
    border-radius: 30px;
    background: #edf2f7; /* Matches base-200 */

    /* Neumorphic Shadows for #edf2f7 */
    box-shadow: 9px 9px 18px #d1d9e6, -9px -9px 18px #ffffff;

    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    height: 100%;
  }

  /* Hover Effect: Lift up slightly */
  .card-content:hover {
    transform: translateY(-5px);
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;

    /* Inset shadow for the icon container (pressed look) */
    background: #edf2f7;
    box-shadow: inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff;

    transition: color 0.3s ease;
  }

  .card-content:hover .icon-wrapper {
    color: var(
      --color-secondary
    ); /* Optional: Changes icon color on card hover */
  }
`;

export default WhyChooseUs;
