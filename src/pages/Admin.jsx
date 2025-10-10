import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiService from "../api";

// Base API URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Admin() {
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    _id: null,
    title: "",
    description: "",
    link: "",
    github: "",
    techStack: "",
    tags: "",
    featured: false,
    sortOrder: 0,
    images: [],
  });
  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState([]);

  // Validate token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      validateToken(storedToken);
    } else {
      setIsValidating(false);
    }
  }, []);

  // Fetch projects when token becomes valid
  useEffect(() => {
    if (isTokenValid && token) {
      fetchProjects();
    }
  }, [isTokenValid, token]);

  const validateToken = async (tokenToValidate) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenToValidate}`
        }
      });

      if (res.ok) {
        setToken(tokenToValidate);
        setIsTokenValid(true);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("token");
        setToken("");
        setIsTokenValid(false);
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.removeItem("token");
      setToken("");
      setIsTokenValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setStatus("❌ Failed to load projects");
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsTokenValid(true);
      setStatus(`✅ Successfully ${isSignup ? "signed up" : "logged in"}!`);
      setEmail("");
      setPassword("");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsTokenValid(false);
    setStatus("You have been logged out.");
  };

  const createOrUpdateProject = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login first");
    setSubmitting(true);
    setStatus("");

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("link", form.link || "");
      fd.append("github", form.github || "");
      fd.append("techStack", form.techStack || "");
      fd.append("tags", form.tags || "");
      fd.append("featured", form.featured);
      fd.append("sortOrder", form.sortOrder);

      if (form.images && form.images.length > 0) {
        fd.append("image", form.images[0]);
      } else if (image) {
        fd.append("image", image);
      }

      const method = form._id ? "PATCH" : "POST";
      const url = form._id
        ? `${API_BASE}/api/projects/${form._id}`
        : `${API_BASE}/api/projects`;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      setStatus(`✅ Project ${form._id ? "updated" : "created"} successfully!`);
      setForm({
        _id: null,
        title: "",
        description: "",
        link: "",
        github: "",
        techStack: "",
        tags: "",
        featured: false,
        sortOrder: 0,
        images: [],
      });
      setImage(null);
      fetchProjects();
    } catch (err) {
      console.error("Full error:", err);
      setStatus(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (_id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/projects/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setStatus("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const editProject = (project) => {
    setForm({ ...project });
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setForm((prev) => ({
        ...prev,
        images: [files[0]],
      }));
    }
  };

  const viewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-700 flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          {token && (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Logout
            </button>
          )}
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {isValidating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="text-white text-xl">Validating session...</div>
              </motion.div>
            ) : !isTokenValid ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Auth Form */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isSignup ? "Create Admin Account" : "Welcome Back"}
                  </h2>
                  <p className="text-blue-300">
                    {isSignup
                      ? "Set up your admin credentials"
                      : "Sign in to manage your portfolio"}
                  </p>
                </div>

                <form
                  onSubmit={handleAuth}
                  className="space-y-6 max-w-md mx-auto bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {submitting
                      ? "Processing..."
                      : isSignup
                      ? "Sign Up"
                      : "Sign In"}
                  </button>
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setIsSignup(!isSignup)}
                      className="text-white underline"
                    >
                      {isSignup
                        ? "Already have an account? Sign in"
                        : "Need an account? Create one"}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Form */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {form._id ? "Edit Project" : "Add New Project"}
                  </h2>
                </div>

                <form
                  onSubmit={createOrUpdateProject}
                  className="space-y-6 mb-8 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
                >
                  {/* inputs */}
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Project Title"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    rows={3}
                    placeholder="Project Description"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <input
                    value={form.link}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, link: e.target.value }))
                    }
                    placeholder="Live Demo URL"
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <input
                    value={form.github}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, github: e.target.value }))
                    }
                    placeholder="GitHub Repository"
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <input
                    value={form.techStack}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, techStack: e.target.value }))
                    }
                    placeholder="Technologies Used (comma separated)"
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <input
                    value={form.tags}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tags: e.target.value }))
                    }
                    placeholder="Tags (comma separated)"
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, featured: e.target.checked }))
                      }
                      className="w-4 h-4"
                    />
                    <span>Featured Project</span>
                  </label>

                  {/* Image Upload */}
                  <div className="flex flex-col">
                    {form._id && form.imageUrl && (
                      <div className="mb-4">
                        <h4 className="text-white text-sm font-medium mb-2">
                          Current Image:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="relative group">
                            <img
                              src={form.imageUrl}
                              alt={form.title}
                              className="h-20 w-20 object-cover rounded cursor-pointer"
                              onClick={() => viewImage(form.imageUrl)}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setForm((f) => ({ ...f, imageUrl: "" }))
                              }
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {form.images.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-white text-sm font-medium mb-2">
                          New Image:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="relative group">
                            <img
                              src={URL.createObjectURL(form.images[0])}
                              alt="New image"
                              className="h-20 w-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setForm((prev) => ({ ...prev, images: [] }))
                              }
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white"
                    />
                    <p className="text-sm text-gray-300 mt-1">
                      Supported formats: JPG, PNG, GIF. Max size: 5MB.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700"
                  >
                    {submitting
                      ? "Processing..."
                      : form._id
                      ? "Update Project"
                      : "Create Project"}
                  </button>
                </form>

                {/* Project List */}
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md"
                    >
                      <div className="flex items-center space-x-4">
                        {p.imageUrl && (
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="h-16 w-16 object-cover rounded"
                          />
                        )}
                        <span className="text-white">{p.title}</span>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => editProject(p)}
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProject(p._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {status && (
                  <div className="mt-4 p-3 rounded bg-white/20 text-white text-center">
                    {status}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Full size preview"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
