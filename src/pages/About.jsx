import React, { useEffect, useState } from "react";
import {
  FaCode,
  FaMobile,
  FaLaptop,
  FaGraduationCap,
  FaLightbulb,
} from "react-icons/fa";

const About = () => {
  const sentences = [
    "Hi, I'm Jiregna Worku.",
    "I'm a Software Engineering student.",
    "I build beautiful web & mobile apps.",
    "Welcome to my portfolio 👋",
  ];

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const current = sentences[index];
      setText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1200);
        setTypingSpeed(50);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % sentences.length);
        setTypingSpeed(100);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, typingSpeed]);

  const skills = [
    {
      name: "Frontend Development",
      icon: FaCode,
      description: "React, NextJs, JavaScript, HTML, CSS",
    },
    {
      name: "Backend Development",
      icon: FaLaptop,
      description: "Node.js, Express.js, MongoDB, REST APIs, NestJs",
    },
    {
      name: "Mobile Development",
      icon: FaMobile,
      description: "React Native, Flutter, Mobile UI/UX",
    },
    {
      name: "Education",
      icon: FaGraduationCap,
      description: "4th-year Software Engineering student",
    },
    {
      name: "Problem Solving",
      icon: FaLightbulb,
      description: "Creative solutions and innovative approaches",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-900 via-black to-blue-700 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About <span className="text-blue-300">Me</span>
          </h2>
          <div className="w-24 h-1 bg-blue-300 mx-auto rounded-full mb-8"></div>

          {/* Typing Animation */}
          <div className="mb-8">
            <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
              <span>{text}</span>
              <span className="animate-pulse">|</span>
            </h3>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Who I Am</h3>
              <div className="space-y-4 text-blue-200 leading-relaxed">
                <p>
                  I'm Jiregna Worku, a 4th-year Software Engineering student at
                  Injibara University. I specialize in creating visually
                  appealing and user-friendly web and mobile applications. With
                  a strong foundation in React, JavaScript, Node.js, and modern
                  UI/UX practices, I enjoy solving problems and building
                  products that make a difference.
                </p>
                <p>
                  My journey in tech began with curiosity and quickly{" "}
                  <span className="font-semibold text-blue-300">grew</span>{" "}
                  into a passion for frontend development and Flutter Mobile App
                  Development. I'm always eager to learn and improve, exploring
                  the latest tools and technologies in the field.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className="flex items-center mb-3">
                    <skill.icon className="text-2xl text-blue-300 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                  </div>
                  <p className="text-blue-200 text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">4+</div>
                  <div className="text-blue-200 text-sm">Years of Study</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">3+</div>
                  <div className="text-blue-200 text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">4+</div>
                  <div className="text-blue-200 text-sm">Ongoing Projects...</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">8+</div>
                  <div className="text-blue-200 text-sm">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">100%</div>
                  <div className="text-blue-200 text-sm">Dedication</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">What I Do</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-200">Design and develop responsive web applications</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-200">Build cross-platform mobile applications</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-200">Create intuitive user interfaces and experiences</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-200">Optimize applications for performance and accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
