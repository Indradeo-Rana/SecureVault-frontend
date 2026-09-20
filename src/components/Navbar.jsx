import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username") || "User";

    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

            {/* Search */}
            <div className="w-96">

                <div className="relative">

                    <span className="absolute left-3 top-2.5 text-slate-400">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search credentials..."
                        className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>


            {/* Right side */}
            <div className="flex items-center gap-6">

                <button className="text-xl hover:bg-slate-100 p-2 rounded-lg"
                onClick={() => toast.info("Notifications feature is coming soon!")}
                >
                    🔔
                    
                </button>

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {username.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-800">
                            {username}
                        </p>

                        <p className="text-xs text-slate-500">
                            Secure Account
                        </p>
                    </div>

                </div>

            </div>
            < ToastContainer />

        </header>
    );
}

export default Navbar;