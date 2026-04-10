import React from "react";
import logo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <footer className="w-full mx-auto bg-linear-to-br from-teal-50 to-orange-50 dark:from-base-200 dark:to-base-200 border border-gray-100 dark:border-base-300 shadow-lg rounded-3xl p-8 md:p-12 text-base-content overflow-hidden min-h-[400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: About Us */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-base-content">About Us</h3>
          <p className="text-base-content/80 text-sm leading-relaxed">
            We provide the best tuition services for students. Connect with
            reliable tutors and enhance your learning experience with
            eTuitionBd.
          </p>
          <div className="flex gap-3 mt-2">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaLinkedinIn />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>
        </div>

        {/* Column 2: Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-base-content">Contact</h3>
          <div className="flex flex-col gap-3 text-sm text-base-content/80 font-medium">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary text-lg" />
              <a
                href="mailto:info@etuitionbd.com"
                className="hover:text-primary transition"
              >
                info@etuitionbd.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary text-lg" />
              <a
                href="tel:+112008835800"
                className="hover:text-primary transition"
              >
                +11 200 883 5800
              </a>
            </div>
          </div>
        </div>

        {/* Column 3: Privacy Policy */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-base-content">Privacy Policy</h3>
          <div className="flex flex-col gap-2 text-sm text-base-content/80">
            <a href="#" className="link link-hover hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="link link-hover hover:text-primary">
              Terms of Use
            </a>
            <a href="#" className="link link-hover hover:text-primary">
              Refund Policy
            </a>
            <a href="#" className="link link-hover hover:text-primary">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Column 4: Terms */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-base-content">Terms</h3>
          <div className="flex flex-col gap-2 text-sm text-base-content/80">
            <a href="#" className="link link-hover hover:text-primary">
              Terms & Conditions
            </a>
            <a href="#" className="link link-hover hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="link link-hover hover:text-primary">
              Copyright Notice
            </a>
            <a href="#" className="link link-hover hover:text-primary">
              Tuition Guidelines
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Bottom Section */}
      <div className="border-t border-base-300 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-bold text-base-content text-lg">
          <img src={logo} className="w-[150px]" alt="eTuitionBD logo" />
        </div>
        <div className="text-sm text-base-content/70 font-medium text-center md:text-right">
          © {year} eTuitionBd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => {
  return (
    <a
      href="#"
      className="bg-base-100 hover:bg-primary/10 text-primary p-3 rounded-full transition-all duration-300 shadow-sm border border-base-300"
    >
      {icon}
    </a>
  );
};

export default Footer;