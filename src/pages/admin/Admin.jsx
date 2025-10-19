import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Users2, LogOut } from "lucide-react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ManageAdmins from "./ManageAdmins";

export default function Admin() {
  const [token, setToken] = useState("");
  const [currentView, setCurrentView] = useState("dashboard"); // 'login', 'dashboard', 'manageAdmins'

  const handleLogin = (newToken) => {
    setToken(newToken);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setToken("");
    setCurrentView("login");
  };

  if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black"
      >
        <Login onLogin={handleLogin} />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 text-white flex flex-col">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="backdrop-blur-xl bg-white/10 border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            ⚙️ Admin Control Center
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                currentView === "dashboard"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <LayoutDashboard size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView("manageAdmins")}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                currentView === "manageAdmins"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Users2 size={16} />
              <span className="hidden sm:inline">Manage Admins</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard token={token} onLogout={handleLogout} />
            </motion.div>
          )}

          {currentView === "manageAdmins" && (
            <motion.div
              key="manageAdmins"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <ManageAdmins token={token} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
