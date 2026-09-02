import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json().catch(() => ({}));
            const token = data.token || response.headers.get("token") 
            || response.headers.get("authorization")
            ?.replace("Bearer ", "");

            if (!token) {
                throw new Error("Token not received");
            }

            localStorage.setItem("token", token);
            alert("Login successful");
            console.log(data)

            navigate("/vault");

        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your credentials and try again.");
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg  max-w-md '>
        <h2 className='text-center text-lg font-medium text-gray-800 mb-6'> Login</h2>
        <div>
            <form action="" onSubmit= {handleSubmit}>
                <div className='mb-4'> 
                    <label className='block text-gray-700 text-sm font-medium mb-2'>Username* </label>
                    <input 
                    className='w-full border border-gray-300 rounded-md px-3 py-2'
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange= { (e)=> setUsername(e.target.value)}

                    />

                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-medium mb-2 '>Password* </label>
                     <input 
                     className='w-full border border-gray-300 rounded-md px-3 py-2'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange= { (e)=> setPassword(e.target.value)}
                    
                    />
                </div>

                <button 
                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4'
                type='submit'>Login</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login