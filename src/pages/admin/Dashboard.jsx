import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, LogOut, PlusCircle, Edit2, Trash2, Image as ImageIcon } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard({ token, onLogout }) {
  const [projects, setProjects] = useState([]);
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setStatus("❌ Failed to load projects");
    }
  };

  const createOrUpdateProject = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login first");
    setSubmitting(true);
    setStatus("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key !== "images") fd.append(key, val);
      });
      if (form.images.length > 0) fd.append("image", form.images[0]);
      if (image) fd.append("image", image);

      const method = form._id ? "PATCH" : "POST";
      const url = form._id
        ? `${API_BASE}/api/projects/${form._id}`
        : `${API_BASE}/api/projects`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      setStatus(`✅ Project ${form._id ? "updated" : "created"} successfully!`);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
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
      setStatus("✅ Project deleted");
      fetchProjects();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const editProject = (p) => setForm({ ...p, images: p.images || [] });
  const resetForm = () =>
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((f) => ({ ...f, images: f.images ? [file] : [file] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
          🧩 Admin Dashboard
        </h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Panel */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <PlusCircle size={22} /> {form._id ? "Edit Project" : "Add New Project"}
          </h2>

          <form onSubmit={createOrUpdateProject} className="space-y-4">
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Project Title"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Description"
              rows={3}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={form.link}
                onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                placeholder="Live URL"
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
              />
              <input
                value={form.github}
                onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
                placeholder="GitHub"
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
              />
            </div>
            <input
              value={form.techStack}
              onChange={(e) => setForm((f) => ({ ...f, techStack: e.target.value }))}
              placeholder="Tech Stack"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm">Featured project</span>
            </div>

            {/* Upload */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-6 cursor-pointer hover:bg-white/5 transition-all">
              <ImageIcon size={22} className="mb-2 text-blue-300" />
              <span className="text-sm text-gray-300">
                {form.images && form.images.length > 0
                  ? form.images[0].name
                  : "Click to upload image"}
              </span>
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
            >
              {submitting ? <Loader2 className="animate-spin" /> : null}
              {form._id ? "Update Project" : "Create Project"}
            </button>

            {status && (
              <p className="text-sm text-center mt-2 text-gray-300">{status}</p>
            )}
          </form>
        </motion.div>

        {/* Project List */}
        <div className="col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">📁 Projects</h3>

          {projects.length === 0 && (
            <p className="text-gray-400 text-sm">No projects yet.</p>
          )}

          <AnimatePresence>
            {projects.map((p) => (
              <motion.div
                key={p._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-16 w-16 object-cover rounded-lg border border-white/20"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-white/5 rounded-lg flex items-center justify-center text-gray-500">
                      <ImageIcon size={20} />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold">{p.title}</h4>
                    <p className="text-sm text-gray-300">{p.techStack}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editProject(p)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteProject(p._id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
