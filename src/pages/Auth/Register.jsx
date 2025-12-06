import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const tabs = [
  {
    label: "Register As Student",
    content: (
      <div>
        <form>
          <fieldset className="fieldset">
            <label className="label">First Name</label>
            <input type="text" className="input" placeholder="First Name" />
            <label className="label">Last Name</label>
            <input type="text" className="input" placeholder="Last Name" />
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <input
              type="submit"
              value="Register"
              className="btn btn-secondary mt-5"
            />
          </fieldset>
        </form>
      </div>
    ),
  },
  {
    label: "Register As Tutor",
    content: (
      <form>
        <fieldset className="fieldset">
          <label className="label">First Name</label>
          <input type="text" className="input" placeholder="First Name" />
          <label className="label">Last Name</label>
          <input type="text" className="input" placeholder="Last Name" />
          <label className="label">Institution</label>
          <input type="text" className="input" placeholder="Institution" />
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <input
            type="submit"
            value="Register"
            className="btn btn-secondary mt-5"
          />
        </fieldset>
      </form>
    ),
  },
];

const Register = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="flex justify-center items-center h-full [&_input]:w-full">
      <div className="bg-white w-full max-w-[500px] p-10 rounded-3xl">
        {/* 1. The Tab Bar */}
        <div className="flex space-x-1 w-fit mx-auto bg-base-300 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-2"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {/* The Text (z-index ensures it sits ON TOP of the pill) */}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  activeTab === tab.label ? "text-white" : "text-neutral"
                }`}
              >
                {tab.label}
              </span>

              {/* The Sliding Pill (Background) */}
              {activeTab === tab.label && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-0 bg-primary rounded-full"
                  // "spring" makes it bounce slightly when it lands
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 2. The Content Area */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold my-5 text-center">{activeTab}</h3>
              <div className="text-neutral">
                {tabs.find((t) => t.label === activeTab)?.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
          <div className="divider">OR</div>
        <p className="text-center">Already have an account? <Link to='/login' className="text-secondary">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
