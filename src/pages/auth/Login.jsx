import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getDeviceId } from "../../utils/deviceId";
import API_BASE_URL from "../../config/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Id": getDeviceId(),
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message || data.error || "Invalid username or password");
        return;
      }
      if (data.mfaRequired) {
        localStorage.setItem("mfaChallengeId", data.challengeId);
        navigate("/mfa-verification");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center text-white mb-8">
          <div className="text-5xl">🔐</div>

          <h1 className="text-3xl font-bold mt-3">SecureVault</h1>

          <p className="text-slate-400 mt-2">Secure Password Management</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>

          <p className="text-slate-500 mt-1 mb-6">
            Login to access your vaults.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Username or Email
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username or email"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>

              <div className="flex gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
{error && (
    <p className="text-red-500 text-sm mt-2">
        {error}
    </p>
)}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 border border-slate-300 rounded-lg"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {/* oAuth2 login */}
            <div className="flex items-center gap-3 my-6">
              {" "}
              <div className="flex-1 h-px bg-slate-200"></div>{" "}
              <span className="text-sm text-slate-400"> OR </span>{" "}
              <div className="flex-1 h-px bg-slate-200"></div>{" "}
            </div>{" "}
            <button
              type="button"
              onClick={() => {
                getDeviceId(); // Ensure device ID is generated and stored before redirecting

                window.location.href =
                  `${API_BASE_URL}/oauth2/authorization/google`;
              }}
              className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-lg font-semibold transition"
            >
              {" "}
              Continue with Google{" "}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
