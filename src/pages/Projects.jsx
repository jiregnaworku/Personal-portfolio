import React, { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaStar, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import apiService from "../api";

// Base API URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await apiService.get('/api/projects');
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const parseArray = (str) => {
    if (!str) return [];
    if (typeof str === 'string') return str.split(',').map(i => i.trim()).filter(Boolean);
    if (Array.isArray(str)) return str.filter(Boolean);
    return [];
  };

  // Helper function to handle image URLs
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;

    // If it's already a full URL (starts with http/https), use it directly
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // Otherwise, prepend the API base URL
    return `${API_BASE}/${imageUrl}`;
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center space-y-4">
        <FaSpinner className="animate-spin text-4xl text-blue-400" />
        <p className="text-gray-300 text-lg">Loading projects...</p>
      </div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center space-y-4 text-center max-w-md">
        <FaExclamationTriangle className="text-4xl text-red-500" />
        <h3 className="text-xl font-semibold text-white">Unable to Load Projects</h3>
        <p className="text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (loading) return <section className="py-20 bg-gradient-to-br from-blue-900 via-black to-blue-700"><LoadingSpinner /></section>;
  if (error) return <section className="py-20 bg-gradient-to-br from-blue-900 via-black to-blue-700"><ErrorMessage /></section>;

  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);
  const sortedProjects = [...featuredProjects, ...regularProjects];

  return (
    <section id="project" className="py-20 bg-gradient-to-br from-blue-900 via-black to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">My Projects</h2>
          <p className="text-xl text-blue-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAllProjects ? sortedProjects : sortedProjects.slice(0, 3)).map((project) => (
            <div
              key={project._id || project.title}
              className={`group bg-white/10 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/20 overflow-hidden ${
                project.featured
                  ? 'border-yellow-400 shadow-yellow-300/50'
                  : 'border-transparent hover:border-blue-400 hover:shadow-blue-400/20'
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-800/20 to-black/20 rounded-t-2xl">
                {project.imageUrl ? (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={getImageUrl(project.imageUrl)}
                      alt={project.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                      if (e.target) {
                        e.target.style.display = 'none';
                        const nextSibling = e.target.nextSibling;
                        if (nextSibling) {
                          nextSibling.style.display = 'flex';
                        }
                      }
                    }}
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-blue-300">No Image</p>
                    </div>
                  </div>
                )}

                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <FaStar className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 mb-2">{project.title}</h3>
                <p className="text-blue-200 text-sm mb-4 line-clamp-3">{project.description}</p>

                {project.techStack && parseArray(project.techStack).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {parseArray(project.techStack).map((tech, index) => (
                      <span key={index} className="px-3 py-1.5 bg-blue-400/20 hover:bg-blue-400/30 text-white text-xs font-medium rounded-full border border-blue-400/30 transition-all duration-200 hover:scale-105">{tech}</span>
                    ))}
                  </div>
                )}

                {project.tags && parseArray(project.tags).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {parseArray(project.tags).map((tag, index) => (
                      <span key={index} className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg border border-white/30 transition-all duration-200 hover:scale-105">#{tag}</span>
                    ))}
                  </div>
                )}

                <div className="flex space-x-3">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200">
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/20 hover:bg-white/30 text-white text-center py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200">
                      <FaGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>

                {!project.link && !project.github && <p className="text-blue-200 text-sm text-center py-2">Links not available</p>}
              </div>
            </div>
          ))}
        </div>

        {projects.length > 3 && !showAllProjects && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllProjects(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <span>See More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {showAllProjects && projects.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllProjects(false)}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <span>Show Less</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        )}

        {projects.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
              <p className="text-blue-200">Projects will appear here once they're added through the admin panel.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
