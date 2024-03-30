import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInStatus, setLoggedIn, setUserId } from './Status';
import Navbar from './Navbar';

export default function Login() {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "", // Add username field to formData
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        username: "", // Add username field to errors
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const validateForm = () => {
        let isValid = true;
        const { email, password, username } = formData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Invalid email address",
            }));
            isValid = false;
        }

        if (!password.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password can't be empty",
            }));
            isValid = false;
        }

        if (!username.trim()) { // Validate username field
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: "Username can't be empty",
            }));
            isValid = false;
        }
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

            if (response.ok) {
                // console.log("Successful Login");
                const responseData = await response.json();
                const idResponse = await fetch(`http://localhost:8000/users`, { method: 'GET' });
                if (idResponse.ok) {
                    const userRoles = await idResponse.json();
                    const data = userRoles.data;
                    const userData = data.find(user => user.email === formData.email);
                    let id = userData.userId;
                    let role = userData.role;
                    console.log("User ID:", id);
                    console.log("User Role:", role);
                    if(role!=="Unassigned")
                    {
                        setUserId(id);
                        setLoggedIn(role);
                        history('/dashboard');
                        window.location.reload();
                    }
                    else
                    {
                        alert("You have no role assigned");
                    }
              } else {
                  console.error("Failed to fetch user roles");
              }
                
            } else {
                const responseData = await response.json();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: responseData.message,
                    }));
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };
    

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <Navbar/>
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleLogin}>
                <div className="mb-2">
                        <label
                        htmlFor="username"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                errors.username ? "border-red-500" : ""
                            }`}
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                errors.email ? "border-red-500" : ""
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                errors.password ? "border-red-500" : ""
                            }`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>
                    <a href="/forgot_password" className="text-xs text-purple-600 hover:underline">
                        Forgot Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="registration"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
