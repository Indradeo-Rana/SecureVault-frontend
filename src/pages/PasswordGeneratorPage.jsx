import React, { useState } from "react";
import Layout from "../components/Layout";
import PasswordGenerator from "../components/PasswordGenerator";
import PasswordStrength from "../components/PasswordStrength";

function PasswordGeneratorPage() {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Layout>

            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold text-slate-800">
                    Password Generator
                </h1>

                <p className="text-slate-500 mt-1 mb-6">
                    Generate a strong and secure password.
                </p>


                <div className="bg-white p-7 rounded-xl border border-slate-200">

                    <label className="block text-sm font-medium mb-2">
                        Generated Password
                    </label>

                    <div className="flex gap-2">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            readOnly
                            placeholder="Generate a password"
                            className="flex-1 border rounded-lg px-4 py-3 font-mono"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="px-4 border rounded-lg"
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

            </div>

        </Layout>
    );
}

export default PasswordGeneratorPage;