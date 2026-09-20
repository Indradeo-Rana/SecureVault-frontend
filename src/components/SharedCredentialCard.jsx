import React from "react";
import { useNavigate } from "react-router-dom";

function SharedCredentialCard({ share }) {

    const navigate = useNavigate();

    const canEdit =
        share.permission === "EDIT" ||
        share.permission === "MANAGE";

    const handleView = () => {
        navigate(`/credential/${share.credentialId}`);
    };

    const handleEdit = () => {
        navigate(`/edit-credential/${share.credentialId}`);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <div className="flex items-start justify-between">

                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        {share.credentialTitle}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Owner: {share.ownerUsername}
                    </p>
                </div>

                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {share.permission}
                </span>

            </div>

            <div className="mt-4 flex gap-2">

                {/* VIEW */}
                <button
                    type="button"
                    onClick={handleView}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                    👁 View
                </button>

                {/* EDIT */}
                {canEdit && (
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                    >
                        ✏ Edit
                    </button>
                )}

            </div>

            <div className="mt-4 text-sm text-slate-500">

                {share.expiresAt ? (
                    <p>
                        Expires:{" "}
                        {new Date(
                            share.expiresAt
                        ).toLocaleString()}
                    </p>
                ) : (
                    <p>No expiry</p>
                )}

            </div>

        </div>
    );
}

export default SharedCredentialCard;