import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoggedIn, setUserId } from "./Status";
import Navbar from "./Navbar";

export default function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const history = useNavigate();

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
    const { username, email, password, password_confirmation } = formData;

    if (!username.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Name can't be empty",
      }));
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      isValid = false;
    }

    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      isValid = false;
    }

    if (!password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Passwords can't be empty",
      }));
      isValid = false;
    }

    if (password !== password_confirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation: "Passwords do not match",
      }));
      isValid = false;
    }

    if (!password_confirmation.trim() && password === password_confirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation: "Passwords can't be empty",
      }));
      isValid = false;
    }
    if (!password_confirmation.trim() && password !== password_confirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation: "Passwords do not match",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { username, email, password } = formData;

    const response = await fetch("http://localhost:8000/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok)
      {
        const responseData = await response.json();
              const idResponse = await fetch(`http://localhost:8000/users`, { method: 'GET' });
              if (idResponse.ok) {
                const userRoles = await idResponse.json();
                const data = userRoles.data;
                const userData = data.find(user => user.email === formData.email);
                let id = userData.userId;
                let role = userData.role;
                setUserId(id);
                setLoggedIn(role);
                history('/dashboard');
                window.location.reload();
              } else {
                  console.error("Failed to fetch user roles");
              }
                
            } else {
                const responseData = await response.json();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        password_confirmation: responseData.message,
                    }));
            }
      }
    // if (existingUser) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     email: "Email is already registered",
    //   }));
    //   return;
    // }

  return (
    <div>
    <Navbar/>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50 mt-5">
        <h1 className="text-3xl font-semibold text-center text-purple-700  ">
          Register
        </h1>
        <div className="w-full px-6 py-4 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleRegistration}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <div className="flex flex-col items-start">
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
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
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
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
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
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    errors.password_confirmation ? "border-red-500" : ""
                  }`}
                />
                {errors.password_confirmation && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
                         