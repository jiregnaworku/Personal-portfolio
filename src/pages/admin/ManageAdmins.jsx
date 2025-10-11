import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ManageAdmins({ token }) {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, [token]);

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid response: expected array");
      setAdmins(data);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
      setStatus("❌ Failed to load admins");
      setAdmins([]);
    }
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setSubmitting(true);
    setStatus("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create admin");
      setStatus("✅ Admin created successfully!");
      setForm({ email: "", password: "" });
      fetchAdmins();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const updateAdmin = async (e) => {
    e.preventDefault();
    if (!editingAdmin) return;
    setSubmitting(true);
    setStatus("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/admins/${editingAdmin._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update admin");
      setStatus("✅ Admin updated successfully!");
      setEditingAdmin(null);
      setForm({ email: "", password: "" });
      fetchAdmins();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteAdmin = async (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/auth/admins/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete admin");
      setStatus("✅ Admin deleted successfully!");
      fetchAdmins();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const startEdit = (admin) => {
    setEditingAdmin(admin);
    setForm({ email: admin.email, password: "" });
  };

  const cancelEdit = () => {
    setEditingAdmin(null);
    setForm({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1f] via-[#101936] to-[#1b2550] p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mx-auto rounded-3xl shadow-xl border border-white/10 bg-white/5 backdrop-blur-lg p-10"
      >
        <h1 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Manage Admins
        </h1>

        {/* Admin Form */}
        <form
          onSubmit={editingAdmin ? updateAdmin : createAdmin}
          className="mb-10 space-y-6 bg-white/5 border border-white/10 p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
            {editingAdmin ? "✏️ Update Admin" : "➕ Create New Admin"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="Admin Email"
              required
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder={
                editingAdmin
                  ? "New Password (leave blank to keep current)"
                  : "Password"
              }
              minLength={6}
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={submitting || !form.email || (!form.password && !editingAdmin)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting
                ? "Processing..."
                : editingAdmin
                ? "Update Admin"
                : "Create Admin"}
            </button>
            {editingAdmin && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 rounded-lg bg-gray-600/70 hover:bg-gray-700 transition font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Admin List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Existing Admins</h2>
          {admins.length === 0 && (
            <p className="text-gray-400 text-center py-6">No admins found.</p>
          )}
          {admins.map((admin) => (
            <motion.div
              key={admin._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
            >
              <div>
                <p className="font-medium text-lg">{admin.email}</p>
                <p className="text-sm text-gray-400">Role: {admin.role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(admin)}
                  className="px-4 py-2 bg-blue-600/80 hover:bg-blue-700 rounded-lg transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAdmin(admin._id)}
                  className="px-4 py-2 bg-red-600/80 hover:bg-red-700 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-3 text-center rounded-lg bg-white/10 border border-white/20"
          >
            {status}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
