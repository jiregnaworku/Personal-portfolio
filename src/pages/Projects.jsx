import React from "react";
import "../styles/Projects.css";
import "../Styles/global.css";

const projects = [
  {
    title: "Online Coffee Shop (Afaan Oromoo)",
    description:
      "A responsive online coffee shop web app built for Afaan Oromoo speakers. Features product listings, cart, and order management. Available on GitHub.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://jiregnaworku.github.io/Online-coffee-shop/",
    status: "Completed",
  },
  {
    title: "House Rental Management System",
    description:
      "A full-stack MERN web app for managing rental properties. Includes landlord/tenant login, rental forms, payments, and admin dashboards. Built during internship at OICT Solution.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
    status: "Ongoing (Internship)",
  },
  {
    title: "Kids Learning Application",
    description:
      "A colorful and engaging app for kids to learn alphabets, numbers, colors, and more. Built with Flutter and includes dark mode, parent lock, and local storage features.",
    tech: ["Flutter", "Dart"],
    link: "https://github.com/jiregnaworku/kids_learning_app",
    status: "Ongoing...",
  },
];

const Projects = () => {
  return (
    <div className="gradient-bg">
      <div className="page-content">
        <section className="projects" id="projects">
          <h2>My Projects</h2>
          <div className="projects-container">
            <div className="project-grid">
              {projects.map((proj, index) => (
                <div key={index} className="project-card">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>

                  <div className="tech-tags">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="project-status">{proj.status}</p>
                  {proj.link && proj.link !== "#" && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      🔗 View Project
                    </a>
                  )}
            </div>
          ))}
        </div>
      </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
