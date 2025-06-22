import React from "react";
import "../styles/Resume.css";
import "../Styles/global.css";

const Resume = () => {
  return (
    <div className="gradient-bg">
      <div className="page-content" style={{color: '#fff'}}>
        <section id="Resume" className="resume-section">
          <div className="resume-content">
            <h2>📄 Resume</h2>
            <p className="resume-intro">
              Below is a quick summary of my education, skills, and experience. You
              can also download the full resume as a PDF.
            </p>
            <div className="resume-columns">
              {/* Left Column */}
              <div className="resume-left">
                {/* Education */}
                <h3>🎓 Education</h3>
                <ul>
                  <li>
                    <strong>BSc in Software Engineering</strong>
                    <br />
                    Injibara University (2021 - 2026)
                  </li>
                </ul>
                {/* Skills */}
                <h3>🛠️ Skills</h3>
                <ul className="skill-list">
                  <li>React.js</li>
                  <li>React Native</li>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>JavaScript</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>Java</li>
                  <li>C++</li>
                  <li>AI / Machine Learning</li>
                  <li>Git & GitHub</li>
                  <li>Flutter (Basic)</li>
                </ul>
              </div>
              {/* Right Column */}
              <div className="resume-right">
                {/* Experience */}
                <h3>💼 Experience</h3>
                <ul>
                  <li>
                    <strong>Intern @ OICT Solution, Addis Ababa</strong>
                    <br />
                    Currently working on a full-stack House Rental Management System
                    using the MERN stack and a mobile version in React Native.
                  </li>
                  <li>
                    <strong>Personal Projects</strong>
                    <br />
                    <em>Online Coffee Shop (Afaan Oromoo)</em> – Fully developed and
                    hosted on GitHub.
                    <br />
                    <em>Kids Learning App</em> – Educational application for
                    children, nearly completed, made independently.
                  </li>
                </ul>
                {/* Download Button */}
                <a
                  href="/assets/Jiregna_Worku_Resume.pdf"
                  download
                  className="download-btn"
                >
                  📥 Download Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
