import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import ShareCredential from "../../components/ShareCredential";
import CredentialCard from "../../components/CredentialCard";

function Vault() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sharingCredential, setSharingCredential] = useState(null);

  const fetchCredentials = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/credential", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch credentials");
      }

      const data = await response.json();

      setCredentials(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this credential?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/credential/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete credential");
      }

      setCredentials(credentials.filter((credential) => credential.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete credential");
    }
  };

  const filteredCredentials = credentials.filter((credential) => {
    const searchText = search.toLowerCase();

    return (
      credential.title?.toLowerCase().includes(searchText) ||
      credential.username?.toLowerCase().includes(searchText) ||
      credential.website?.toLowerCase().includes(searchText)
    );
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Vault</h1>

          <p className="text-slate-500 mt-1">
            Manage all your stored credentials.
          </p>
        </div>

        <button
          onClick={() => navigate("/add-credential")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
        >
          + Add Credential
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6">
        <div className="relative">
          <span className="absolute left-4 top-3 text-slate-400">🔍</span>

          <input
            type="text"
            placeholder="Search by title, username or website..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-200 rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">
          Loading credentials...
        </div>
      ) : filteredCredentials.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-16 text-center">
          <div className="text-5xl mb-4">🔐</div>

          <h2 className="text-xl font-bold text-slate-800">
            No credentials found
          </h2>

          <p className="text-slate-500 mt-2">
            Add your first credential to your vault.
          </p>

          <button
            onClick={() => navigate("/add-credential")}
            className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
          >
            Add Credential
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCredentials.map((credential) => (
            <div key={credential.id}>
              <CredentialCard
                // key={credential.id}
                credential={credential}
                onDelete={handleDelete}
                onShare={() => setSharingCredential(credential)}
              />

              {sharingCredential?.id === credential.id && (
                <div className="mt-3">
                  <ShareCredential
                    credentialId={credential.id}
                    onClose={() => setSharingCredential(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Vault;
