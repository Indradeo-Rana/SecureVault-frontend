import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import PasswordGenerator from "../components/PasswordGenerator";
import PasswordStrength from "../components/PasswordStrength";
import { ToastContainer, toast } from "react-toastify";

function AddCredential() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [website, setWebsite] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/credential",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        username,
                        password,
                        website,
                        notes
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add credential");
            }

            // alert("Credential added successfully");
            toast.success("Credential added successfully");

            navigate("/vault");

        } catch (error) {

            console.error(error);

            // alert(
            //     "Failed to add credential. Please try again."
            // );
            toast.error(
                "Failed to add credential. Please try again."
            );

        }
    };


    return (
        <Layout>

            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-6">

                    <button
                        onClick={() => navigate("/vault")}
                        className="text-blue-600 hover:underline mb-3"
                    >
                        ← Back to Vault
                    </button>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Add Credential
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Store a new credential securely.
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-7"
                >

                    {/* Title */}
                    <div className="mb-5">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Google"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    {/* Username */}
                    <div className="mb-5">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Username or email"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    {/* Password */}
                    <div className="mb-5">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>

                        <div className="flex gap-2">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="px-4 border border-slate-300 rounded-lg hover:bg-slate-100"
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>


                        <PasswordGenerator
                            setPassword={setPassword}
                        />

                        <PasswordStrength
                            password={password}
                        />

                    </div>


                    {/* Website */}
                    <div className="mb-5">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Website
                        </label>

                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={website}
                            onChange={(e) =>
                                setWebsite(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    {/* Notes */}
                    <div className="mb-6">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Notes
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Additional notes..."
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    {/* Buttons */}
                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={() => navigate("/vault")}
                            className="px-5 py-3 border border-slate-300 rounded-lg hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                        >
                            Save Credential
                        </button>

                    </div>

                </form>
                < ToastContainer />

            </div>

        </Layout>
    );
}

export default AddCredential;