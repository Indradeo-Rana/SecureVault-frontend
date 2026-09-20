import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText);

                throw new Error(
                    "Registration failed! Please check your credential."
                );
            }

            // alert(
            //     "Registration successful. Please login."
            // );
            toast.success(
                "Registration successful. Please login."
            );

            navigate("/login");

        } catch (error) {

            console.error(error);

            // alert(
            //     "Registration failed. Please try again."
            // );
            toast.error(
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                <div className="text-center text-white mb-8">

                    <div className="text-5xl">
                        🔐
                    </div>

                    <h1 className="text-3xl font-bold mt-3">
                        SecureVault
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Create your secure vault
                    </p>

                </div>


                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Create Account
                    </h2>

                    <p className="text-slate-500 mt-1 mb-6">
                        Start securing your credentials.
                    </p>


                    <form onSubmit={handleSubmit}>

                        <div className="mb-5">

                            <label className="block text-sm font-medium mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                placeholder="Choose username"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        <div className="mb-5">

                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="you@example.com"
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
                                    placeholder="Create password"
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
                                ? "Creating..."
                                : "Create Account"}
                        </button>

                    </form>


                    <p className="text-center text-sm text-slate-500 mt-6">

                        Already have an account?{" "}

                        <button
                            onClick={() =>
                                navigate("/login")
                            }
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </button>

                    </p>

                </div>

            </div>

            < ToastContainer />

        </div>
    );
}

export default Register;