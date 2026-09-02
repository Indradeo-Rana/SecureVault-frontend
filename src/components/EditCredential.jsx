import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

function EditCredential() {
  // Get ID from URL
  const { id } = useParams();

  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);

  // ============================
  // GET EXISTING CREDENTIAL
  // ============================

  const fetchCredential = async () => {
    try {
      // Get JWT token
      const token = localStorage.getItem("token");

      // Call backend
      const response = await fetch(
        `http://localhost:8080/api/credential/${id}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load credential");
      }

      // Convert JSON response
      const data = await response.json();

      // Put existing backend data into form states
      setTitle(data.title);
      setUsername(data.username);
      setPassword(data.password);
      setWebsite(data.website);
      setNotes(data.notes);
    } catch (error) {
      console.error(error);

      alert("Failed to load credential");
    } finally {
      setLoading(false);
    }
  };

  // Run when page opens
  useEffect(() => {
    fetchCredential();
  }, [id]);

  // ============================
  // UPDATE CREDENTIAL
  // ============================

  const handleSubmit = async (e) => {
    // Prevent normal form reload
    e.preventDefault();

    try {
      // Get JWT
      const token = localStorage.getItem("token");

      // Call PUT API
      const response = await fetch(
        `http://localhost:8080/api/credential/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            username,
            password,
            website,
            notes,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update credential");
      }

      alert("Credential updated successfully");

      // Go back to Vault
      navigate("/vault");
    } catch (error) {
      console.error(error);

      alert("Failed to update credential");
    }
  };

  // Show loading while GET API is running
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading credential...</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate("/vault");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => {
              handleBack();
            }}
          >
            <span className=" text-lg "> ← </span>
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Edit Credential
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* TITLE */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title
            </label>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* USERNAME */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* WEBSITE */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Website
            </label>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* NOTES */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Notes
            </label>

            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Update Credential
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCredential;
