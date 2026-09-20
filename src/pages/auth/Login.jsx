import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);

            if (data.username) {
                localStorage.setItem(
                    "username",
                    data.username
                );
            }

            localStorage.setItem(
                "email",
                data.email || ""
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            // alert(
            //     "Login failed. Please check your credentials."
            // );
            toast.error(
                "Login failed. Please check your credentials.",
                
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="text-center text-white mb-8">

                    <div className="text-5xl">
                        🔐
                    </div>

                    <h1 className="text-3xl font-bold mt-3">
                        SecureVault
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Secure Password Management
                    </p>

                </div>


                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Welcome Back
                    </h2>

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
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                placeholder="Enter username or email"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        <div className="mb-6">

                            <label className="block text-sm font-medium mb-2">
                                Password
                            </label>

                            <div className="flex gap-2">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter password"
                                    className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="px-3 border border-slate-300 rounded-lg"
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>


                    <p className="text-center text-sm text-slate-500 mt-6">

                        Don't have an account?{" "}

                        <button
                            onClick={() =>
                                navigate("/register")
                            }
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Create Account
                        </button>

                    </p>

                </div>

            </div>

            < ToastContainer />

        </div>
    );
}

export default Login;