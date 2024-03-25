import React, { useState } from 'react';
import Navbar from './Navbar';

export default function CreateUserForm() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { username, email, password } = userData;

    if (!username.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username can't be empty",
      }));
      isValid = false;
    }

    if (!email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email can't be empty",
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

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await createUserAPI(userData);
      console.log('User created successfully:', response);
      // Reset form after successful user creation
      setUserData({
        username: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const createUserAPI = async (userData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };
    // Replace 'url' with the actual API endpoint
    const response = await fetch('url', requestOptions);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to create user');
    }
    return response.json();
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Create User
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? "border-red-500" : ""}`}
              id="username"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : ""}`}
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : ""}`}
              id="password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
