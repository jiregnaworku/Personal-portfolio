import React from "react";
import profilePic from "../assets/profile.png";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Home = () => {
  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "React Native", icon: "📱" },
    { name: "JavaScript", icon: "🟨" },
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🟦" },
    { name: "Node.js", icon: "🟩" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Express.js", icon: "🛠️" },
    { name: "Git & GitHub", icon: "📦" },
    { name: "Flutter", icon: "📱" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaEnvelope, href: "#contact", label: "Email" },
  ];

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-400">
                  Jiregna Worku
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-primary-100">
                A Passionate Frontend Web and Mobile App Developer
              </h2>
            </div>

            <p className="text-lg text-gray-200 leading-relaxed max-w-2xl">
              I'm a 4th-year Software Engineering student at Injibara University
              who loves building beautiful and functional frontend websites and mobile applications using React, Node.js, and modern web technologies.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#about" className="btn-primary">
                See More
              </a>
              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110 hover:rotate-3"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative">
                <img
                  src={profilePic}
                  alt="Jiregna Worku"
                  className="w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white/20 shadow-2xl animate-slide-up"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center animate-bounce-slow">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 animate-slide-up">
          <h3 className="text-2xl font-semibold text-white text-center mb-8">
            Technologies I Work With
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="glass-effect p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <p className="text-sm font-medium text-white">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
