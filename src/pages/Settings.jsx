import React from "react";
import Layout from "../components/Layout";

function Settings() {

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-slate-800">
                Settings
            </h1>

            <p className="text-slate-500 mt-1">
                Manage your SecureVault preferences.
            </p>


            <div className="mt-8 bg-white rounded-xl border border-slate-200 p-8">

                <h2 className="text-xl font-bold">
                    Account Settings
                </h2>

                <p className="text-slate-500 mt-2">
                    Additional account and security settings
                    will be added here.
                </p>

                <div className="mt-5 inline-block px-5 py-2 bg-blue-100 text-blue-700 rounded-full">
                    Coming Soon
                </div>

            </div>

        </Layout>
    );
}

export default Settings;