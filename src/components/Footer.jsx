import React from "react";
import { Link } from "react-scroll";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTelegram,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "project", label: "Projects" },
    { to: "resume", label: "Resume" },
    { to: "contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/jiregnaworku",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/jiregna-worku-5519302aa",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:jiregna123w@gmail.com",
      icon: FaEnvelope,
      label: "Email",
    },
    {
      href: "https://t.me/jiroow",
      icon: FaTelegram,
      label: "Telegram",
    },
  ];

  return (
    <footer className="bg-dark-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary-400 mb-2">
              Jiregna.<span className="text-primary-300">Dev</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Frontend Web & Mobile App Developer
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="text-gray-300 hover:text-primary-300 transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-dark-800 hover:bg-primary-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Jiregna Worku. All rights
              reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <FaHeart className="text-red-500 mx-1" /> using React &
              Tailwind CSS by Jiregna Worku.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
