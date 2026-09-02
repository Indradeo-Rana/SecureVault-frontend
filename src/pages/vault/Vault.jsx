import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Vault() {
  // =========================
  // STATES
  // =========================

  // Store credentials received from backend
  const [credentials, setCredentials] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message state
  const [error, setError] = useState("");

  // Store the credential selected for deletion
  const [selectedCredential, setSelectedCredential] = useState(null);

  // React Router navigation
  const navigate = useNavigate();

  // =========================
  // GET ALL CREDENTIALS
  // =========================

  const fetchCredentials = async () => {
    try {
      // Get JWT token
      const token = localStorage.getItem("token");

      // Call backend API
      const response = await fetch("http://localhost:8080/api/credential", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if request failed
      if (!response.ok) {
        throw new Error("Failed to fetch credentials");
      }

      // Convert JSON response
      const data = await response.json();

      // Store credentials in state
      setCredentials(data);

      // Clear previous error
      setError("");
    } catch (error) {
      console.error(error);

      setError("Failed to load credentials");
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // =========================
  // SOFT DELETE
  // =========================

  const handleSoftDelete = async () => {
    try {
      // Get JWT token
      const token = localStorage.getItem("token");

      // Call soft delete API
      const response = await fetch(
        `http://localhost:8080/api/credential/soft-delete/${selectedCredential.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Check if API failed
      if (!response.ok) {
        throw new Error("Failed to temporarily delete credential");
      }

      // Success message
      alert("Credential moved to trash successfully");

      // Close modal
      setSelectedCredential(null);

      // Reload credentials
      fetchCredentials();
    } catch (error) {
      console.error(error);

      alert("Failed to temporarily delete credential");
    }
  };

  // =========================
  // PERMANENT DELETE
  // =========================

  const handlePermanentDelete = async () => {
    try {
      // Get JWT token
      const token = localStorage.getItem("token");

      // Call permanent delete API
      const response = await fetch(
        `http://localhost:8080/api/credential/${selectedCredential.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Check if API failed
      if (!response.ok) {
        throw new Error("Failed to permanently delete credential");
      }

      // Success message
      alert("Credential permanently deleted successfully");

      // Close modal
      setSelectedCredential(null);

      // Reload credentials
      fetchCredentials();
    } catch (error) {
      console.error(error);

      alert("Failed to permanently delete credential");
    }
  };

  // =========================
    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

  // =========================
  // RUN WHEN PAGE OPENS
  // =========================

  React.useEffect(() => {
    fetchCredentials();
  }, []);

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* PAGE HEADER */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My SecureVault</h1>
            <div className="flex gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/add-credential")}
          >
            + Add Credential
          </button>

          <button 
           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={()=> {handleLogout()}}
          >
            <a href="/">Logout</a>
          </button>
          </div>
        </div>

        {/* LOADING */}

        {loading && <p className="text-gray-600">Loading credentials...</p>}

        {/* ERROR */}

        {error && <p className="text-red-500">{error}</p>}

        {/* NO CREDENTIALS */}

        {!loading && credentials.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">No credentials found.</p>
          </div>
        )}

        {/* CREDENTIALS LIST */}

        <div className="grid gap-4">
          {credentials.map((credential) => (
            <div key={credential.id} className="bg-white p-6 rounded-lg shadow">
              {/* TITLE */}

              <h2 className="text-xl font-bold text-gray-800">
                {credential.title}
              </h2>

              {/* USERNAME */}

              <p className="text-gray-600 mt-2">
                <span className="font-medium">Username:</span>{" "}
                {credential.username}
              </p>

              {/* PASSWORD */}

              <p className="text-gray-600 mt-2">
                <span className="font-medium">Password:</span>{" "}
                {credential.password}
              </p>

              {/* WEBSITE */}

              <p className="text-gray-600">
                <span className="font-medium">Website:</span>{" "}
                {credential.website}
              </p>

              {/* NOTES */}

              {credential.notes && (
                <p className="text-gray-500 mt-3">{credential.notes}</p>
              )}

              {/* EDIT + DELETE BUTTONS */}

              <div className="flex gap-3 mt-4">
                {/* EDIT */}

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate(`/edit-credential/${credential.id}`)}
                >
                  Edit
                </button>

                {/* DELETE */}

                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => setSelectedCredential(credential)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ========================= */}
        {/* DELETE CONFIRMATION MODAL */}
        {/* ========================= */}

        {selectedCredential && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Delete Credential
              </h2>

              <p className="text-gray-600 mb-2">
                Are you sure you want to delete:
              </p>

              {/* SHOW SELECTED CREDENTIAL TITLE */}

              <p className="font-bold text-gray-800 mb-6">
                {selectedCredential.title}
              </p>

              <div className="flex flex-col gap-3">
                {/* TEMPORARY / SOFT DELETE */}

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
                  onClick={handleSoftDelete}
                >
                  Temporary Delete
                </button>

                {/* PERMANENT DELETE */}

                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={handlePermanentDelete}
                >
                  Permanent Delete
                </button>

                {/* CANCEL */}

                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                  onClick={() => setSelectedCredential(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vault;
