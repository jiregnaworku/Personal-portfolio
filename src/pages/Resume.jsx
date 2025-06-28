import React from "react";
import { FaDownload, FaGraduationCap, FaBriefcase, FaTools, FaMapMarkerAlt } from "react-icons/fa";

const Resume = () => {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="text-primary-200">Resume</span>
          </h2>
          <div className="w-24 h-1 bg-primary-200 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            A comprehensive overview of my education, experience, and technical skills.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <FaGraduationCap className="text-3xl text-primary-200 mr-4" />
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white">BSc in Software Engineering</h4>
                <p className="text-primary-200 font-medium mb-2">Injibara University</p>
                <div className="flex items-center text-primary-100 text-sm mb-3">
                  <FaMapMarkerAlt className="mr-2" />
                  Injibara, Ethiopia (2021 - 2026)
                </div>
                <p className="text-primary-100">Currently pursuing my degree with focus on web and mobile development.</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <FaTools className="text-3xl text-primary-200 mr-4" />
                <h3 className="text-2xl font-bold text-white">Skills</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-primary-200 mb-3">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "React Native", "JavaScript", "HTML", "CSS", "Tailwind CSS"].map((skill) => (
                      <span key={skill} className="px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary-200 mb-3">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express.js", "MongoDB", "REST APIs"].map((skill) => (
                      <span key={skill} className="px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <FaBriefcase className="text-3xl text-primary-200 mr-4" />
                <h3 className="text-2xl font-bold text-white">Experience</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white">Frontend Developer Intern</h4>
                  <p className="text-primary-200 font-medium mb-2">OICT Solution</p>
                  <div className="flex items-center text-primary-100 text-sm mb-3">
                    <FaMapMarkerAlt className="mr-2" />
                    Addis Ababa, Ethiopia (2025 - Present)
                  </div>
                  <p className="text-primary-100">Working on House Rental Management System using MERN stack and React Native.</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-white">Freelance Developer</h4>
                  <p className="text-primary-200 font-medium mb-2">Personal Projects</p>
                  <div className="flex items-center text-primary-100 text-sm mb-3">
                    <FaMapMarkerAlt className="mr-2" />
                    Remote (2023 - Present)
                  </div>
                  <p className="text-primary-100">Building web and mobile applications including Online Coffee Shop and Kids Learning App.</p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center">
              <a
                href="/assets/Jiregna_Worku_Resume.pdf"
                download
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300 transform hover:scale-105"
              >
                <FaDownload className="mr-3 text-lg" />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
