import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function SentShares() {

    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchShares();
    }, []);

    const fetchShares = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/shares/sent",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch sent shares");
            }

            const data = await response.json();

            setShares(data);

        } catch (error) {

            console.error(error);
            alert("Failed to load sent shares");

        } finally {

            setLoading(false);

        }
    };

    const revokeShare = async (shareId) => {

        const confirmed = window.confirm(
            "Are you sure you want to revoke this access?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/shares/${shareId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to revoke share");
            }

            setShares(
                shares.filter(
                    share => share.id !== shareId
                )
            );

            alert("Access revoked successfully");

        } catch (error) {

            console.error(error);
            alert("Failed to revoke access");

        }
    };

    const updatePermission = async (
        shareId,
        permission
    ) => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/shares/${shareId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        permission
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update permission"
                );
            }

            setShares(
                shares.map(share =>
                    share.id === shareId
                        ? {
                            ...share,
                            permission: data.permission
                        }
                        : share
                )
            );

            alert("Permission updated");

        } catch (error) {

            console.error(error);
            alert(error.message);

        }
    };

    return (
        <Layout>

            <div className="mb-6">

                <h1 className="text-3xl font-bold text-slate-800">
                    My Shared Credentials
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage credentials you have shared with others.
                </p>

            </div>

            {loading ? (

                <div className="text-center py-20">
                    Loading...
                </div>

            ) : shares.length === 0 ? (

                <div className="bg-white border rounded-xl p-10 text-center">

                    <p className="text-slate-500">
                        You have not shared any credentials.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {shares.map((share) => (

                        <div
                            key={share.id}
                            className="bg-white border border-slate-200 rounded-xl p-5"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <h2 className="font-bold text-lg">
                                        {share.credentialTitle}
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Shared with:{" "}
                                        {share.sharedWithUsername}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-4">

                                <label className="block text-sm font-medium mb-1">
                                    Permission
                                </label>

                                <select
                                    value={share.permission}
                                    onChange={(e) =>
                                        updatePermission(
                                            share.id,
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
                                >
                                    <option value="VIEW">
                                        View Only
                                    </option>

                                    <option value="EDIT">
                                        Edit Access
                                    </option>

                                    <option value="MANAGE">
                                        Full Management
                                    </option>
                                </select>

                            </div>

                            <div className="mt-3 text-sm text-slate-600">

                                {share.expiresAt ? (
                                    <p>
                                        Expires:{" "}
                                        {new Date(
                                            share.expiresAt
                                        ).toLocaleString()}
                                    </p>
                                ) : (
                                    <p>
                                        No expiry
                                    </p>
                                )}

                            </div>

                            <button
                                onClick={() =>
                                    revokeShare(share.id)
                                }
                                className="mt-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
                            >
                                Revoke Access
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </Layout>
    );
}

export default SentShares;