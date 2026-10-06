
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      // Revoke token on backend
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Clear local authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      // Redirect to login
      navigate("/login");
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔐</div>

          <div>
            <h1 className="text-xl font-bold">SecureVault</h1>

            <p className="text-xs text-slate-400">
              Password Manager
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4 py-6 space-y-2">
        
        {/* Main */}
        <p className="text-xs text-slate-500 uppercase px-4 mb-3">
          Main
        </p>

        <NavLink to="/dashboard" className={linkClass}>
          <span>🏠</span>
          Dashboard
        </NavLink>

        <NavLink to="/vault" className={linkClass}>
          <span>🔑</span>
          My Vault
        </NavLink>

        {/* <NavLink to="/password-generator" className={linkClass}>
          <span>⚙️</span>
          Password Generator
        </NavLink> */}

        <NavLink to="/shared-with-me" className={linkClass}>
          <span>🤝</span>
          Shared With Me
        </NavLink>

        <NavLink to="/my-shares" className={linkClass}>
          <span>📤</span>
          My Shares
        </NavLink>

        <NavLink to="/teams" className={linkClass}>
          <span>👥</span>
          Teams Vault
        </NavLink>

        {/* Manage */}
        <p className="text-xs text-slate-500 uppercase px-4 mb-3 mt-8">
          Manage
        </p>

        <NavLink to="/security-settings" className={linkClass}>
          <span>🛡️</span>
          MFA Settings
        </NavLink>

        <NavLink to="/devices" className={linkClass}>
          <span>🛡️</span>
          Device Management
        </NavLink>

        <NavLink to="/trash" className={linkClass}>
          <span>🗑️</span>
          Trash
        </NavLink>

        {/* System */}
        <p className="text-xs text-slate-500 uppercase px-4 mb-3 mt-8">
          System
        </p>

        <NavLink to="/security" className={linkClass}>
          <span>🛡️</span>
          Security Dashboard
        </NavLink>

        <NavLink to="/login-history" className={linkClass}>
          <span>🔐</span>
          Login History
        </NavLink>

        <NavLink to="/audit-logs" className={linkClass}>
          <span>📋</span>
          Audit Logs
        </NavLink>

        <NavLink
          to="/security/password-analytics"
          className={linkClass}
        >
          <span>📊</span>
          Password Analytics
        </NavLink>

        <NavLink to="/security/reports" className={linkClass}>
          <span>📈</span>
          Security Reports
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <span>⚙️</span>
          Settings
        </NavLink>
      </nav>

      {/* Logout - Always visible */}
      <div className="p-4 border-t border-slate-700 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
