import React from "react";
import { FaGithub, FaExternalLinkAlt, FaCode, FaMobile, FaLaptop } from "react-icons/fa";

const projects = [
  {
    title: "Online Coffee Shop (Afaan Oromoo)",
    description:
      "A responsive online coffee shop web app built for Afaan Oromoo speakers. Features product listings, cart, and order management. Available on GitHub.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://jiregnaworku.github.io/Online-coffee-shop/",
    github: "https://github.com/jiregnaworku/Online-coffee-shop",
    status: "Completed",
    icon: FaLaptop,
    category: "Web Development"
  },
  {
    title: "House Rental Management System",
    description:
      "A full-stack MERN web app for managing rental properties. Includes landlord/tenant login, rental forms, payments, and admin dashboards. Built during internship at OICT Solution.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
    github: "#",
    status: "Ongoing (Internship)",
    icon: FaCode,
    category: "Full Stack"
  },
  {
    title: "Kids Learning Application",
    description:
      "A colorful and engaging app for kids to learn alphabets, numbers, colors, and more. Built with Flutter and includes dark mode, parent lock, and local storage features.",
    tech: ["Flutter", "Dart"],
    link: "#",
    github: "https://github.com/jiregnaworku/kids_learning_app",
    status: "Ongoing...",
    icon: FaMobile,
    category: "Mobile Development"
  },
];

const Projects = () => {
  return (
    <div className="bg-white dark:bg-dark-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-primary-600">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in web development, 
            mobile app development, and full-stack solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-dark-700 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
                    <project.icon className="text-primary-600 text-2xl" />
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-600 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    project.status.includes('Completed') 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex space-x-3">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300 text-sm font-medium"
                    >
                      <FaGithub className="text-lg" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 text-sm font-medium"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and exciting projects. 
              Let's create something amazing together!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <span>Get In Touch</span>
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
