import { useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      onLogin(data.token);
      setStatus("✅ Successfully logged in!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="auth"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-700 p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-blue-300">
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
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
              className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {submitting ? "Processing..." : "Sign In"}
            </button>
          </form>

          {status && (
            <div className="mt-4 p-3 rounded bg-white/20 text-white text-center">
              {status}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
