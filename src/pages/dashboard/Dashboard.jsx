import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Dashboard() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState([]);

    useEffect(() => {

        const fetchCredentials = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/api/credential",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch credentials");
                }

                const data = await response.json();

                setCredentials(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchCredentials();

    }, []);


    return (
        <Layout>

            <div className="flex items-center justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Dashboard
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Welcome back! Here's your vault overview.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/add-credential")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
                >
                    + Add Credential
                </button>

            </div>


            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">

                    <p className="text-slate-500">
                        Total Credentials
                    </p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-2">
                        {credentials.length}
                    </h2>

                </div>


                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">

                    <p className="text-slate-500">
                        Vault Status
                    </p>

                    <h2 className="text-2xl font-bold text-green-600 mt-2">
                        Protected
                    </h2>

                </div>


                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">

                    <p className="text-slate-500">
                        Security
                    </p>

                    <h2 className="text-2xl font-bold text-blue-600 mt-2">
                        AES Encrypted
                    </h2>

                </div>

            </div>


            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">

                <h2 className="text-xl font-bold text-slate-800 mb-4">
                    Quick Actions
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    <button
                        onClick={() => navigate("/vault")}
                        className="p-5 border rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                        <div className="text-2xl">🔑</div>
                        <h3 className="font-semibold mt-3">
                            My Vault
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            View your saved credentials.
                        </p>
                    </button>


                    <button
                        onClick={() => navigate("/password-generator")}
                        className="p-5 border rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                        <div className="text-2xl">⚙️</div>
                        <h3 className="font-semibold mt-3">
                            Generate Password
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Create a strong password.
                        </p>
                    </button>


                    <button
                        onClick={() => navigate("/password-health")}
                        className="p-5 border rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                        <div className="text-2xl">🩺</div>
                        <h3 className="font-semibold mt-3">
                            Password Health
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Check your password security.
                        </p>
                    </button>

                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;