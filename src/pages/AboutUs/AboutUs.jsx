import { motion } from "framer-motion";
import { Shield, Users, SearchCheck, Award, Sparkles } from "lucide-react";
import OurGoal from "../../../src/assets/our-goal.jpg";
import { useQuery } from "@tanstack/react-query";
import useAxiosNormal from "../../hooks/useAxiosNormal";

const AboutUs = () => {
  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const axiosNormal = useAxiosNormal();

  const { data={},isPending } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const result = await axiosNormal.get("/about-stats");
      return result.data;
    },
  });

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-extrabold text-base-content sm:text-5xl mb-6">
            Empowering Learning Across{" "}
            <span className="text-primary">Bangladesh</span>
          </h1>
          <p className="text-lg text-base-content/70">
            We are dedicated to bridging the gap between passionate educators
            and eager learners. Our platform makes finding the perfect tutor
            simple, secure, and highly effective.
          </p>
        </motion.div>

        {/* Stats Section using DaisyUI */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center w-full"
        >
          <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200 w-full max-w-4xl">
            <div className="stat place-items-center">
              <div className="stat-figure text-primary">
                <Users className="w-8 h-8" />
              </div>
              <div className="stat-title text-base-content/70">
                Active Students
              </div>
              <div className="stat-value text-primary">
                {isPending?<span className="loading loading-spinner loading-xl"></span>:data.data.student}
              </div>
              <div className="stat-desc text-base-content/50">
                Growing every day
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-figure text-secondary">
                <Award className="w-8 h-8" />
              </div>
              <div className="stat-title text-base-content/70">
                Expert Tutors
              </div>
              <div className="stat-value text-secondary">{isPending?<span className="loading loading-spinner loading-xl"></span>:data.data.tutor}</div>
              <div className="stat-desc text-base-content/50">
                Verified professionals
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-figure text-accent">
                <SearchCheck className="w-8 h-8" />
              </div>
              <div className="stat-title text-base-content/70">
                Tuition Posted
              </div>
              <div className="stat-value text-accent">{isPending?<span className="loading loading-spinner loading-xl"></span>:data.data.totalTuitions}</div>
              <div className="stat-desc text-base-content/50">
                From primary to university level
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission and Vision Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-base-content">
              Our Mission
            </h2>
            <p className="text-base-content/80 leading-relaxed">
              To democratize access to quality education by providing a
              seamless, transparent, and user-friendly platform where knowledge
              meets ambition. We believe that the right guidance can unlock a
              student's full potential, and we strive to make that guidance
              accessible to everyone.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Connecting students with verified, skilled tutors.",
                "Providing a secure environment for educational exchange.",
                "Fostering a community of lifelong learners.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-base-content/80"
                >
                  <div className="p-1 rounded-full bg-primary/20 text-primary">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-base-300 flex items-center justify-center">
            {/* You can replace this div with an actual image tag pointing to one of your assets like src/assets/hero1.png */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-base-300">
              <img
                src={OurGoal}
                alt="Platform Vision"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Core Values Section using DaisyUI Cards */}
        <motion.div variants={itemVariants} className="pt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="card-body items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title text-base-content">Trust & Safety</h3>
                <p className="text-base-content/70">
                  Rigorous verification processes ensure a secure learning
                  environment for both tutors and students.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="card-body items-center text-center">
                <div className="p-4 bg-secondary/10 rounded-full mb-4">
                  <Award className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="card-title text-base-content">Excellence</h3>
                <p className="text-base-content/70">
                  We are committed to maintaining high standards of quality in
                  every educational connection we facilitate.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="card-body items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="card-title text-base-content">Community</h3>
                <p className="text-base-content/70">
                  Building a supportive network that encourages collaborative
                  learning and mutual growth.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
