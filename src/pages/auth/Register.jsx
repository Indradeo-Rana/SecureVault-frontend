import React from "react";
import { useState } from "react";

function Register() {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // success message state message
  const [message, setMessage] = useState("");

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful");

        // Clear form after successful registration
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className ='flex items-center justify-center min-h-screen bg-gray-200' >
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
      <h1 className="text-center text-gray-800 font-medium mb-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='block text-gray-700 text-sm font-medium mb-2'>Username*</label>
          <input
           className="w-full border border-gray-200 rounded-md px-3 py-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div>
          <label 
          className=" block text-gray-700 text-sm font-medium mb-2"
          >Email*</label>

          <input
          className="w-full border border-gray-200 rounded-md px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
          className="block text-gray-700 text-sm font-medium mb-2"
          >Password*</label>
          <input
          className="w-full border border-gray-700 rounded-md px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
        className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4  '
        type="submit">Register</button>
      </form>

      <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;
