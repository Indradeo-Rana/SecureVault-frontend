import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCredential() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get JWT token stored during login
      const token = localStorage.getItem("token");

      // Call Spring Boot API
      const response = await fetch("http://localhost:8080/api/credential", {
        method: "POST",

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
      });

      if (!response.ok) {
        throw new Error("Failed to add credential");
      }

      alert("Credential added successfully");
      navigate("/vault"); // back to vault page after adding credential
    } catch (error) {
      console.error(error);
      alert("Failed to add credential. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/vault");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <div flex gap-2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => {
              handleBack()
            }}
          >
            <span className=" text-lg "> ← </span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Add New Credential
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title
            </label>

            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>

            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>

            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Website
            </label>

            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Notes
            </label>

            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Add Credential
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCredential;
