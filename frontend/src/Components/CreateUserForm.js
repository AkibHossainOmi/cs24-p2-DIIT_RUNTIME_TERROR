import React, { useState } from 'react';
import Navbar from "./Navbar";

export default function CreateUserForm() {
  const [userData, setUserData] = useState({
    user_id: '',
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    user_id: '',
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
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

    const { user_id, username, email, password, first_name, last_name, phone, address } = userData;

    if (!user_id.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        user_id: "User ID can't be empty",
      }));
      isValid = false;
    }

    // Similarly, add validation for other fields

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
        user_id: '',
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const createUserAPI = async (userData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
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
      <Navbar/>
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Create User
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
              User ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.user_id ? "border-red-500" : ""}`}
              id="user_id"
              type="text"
              name="user_id"
              value={userData.user_id}
              onChange={handleInputChange}
              placeholder="User ID"
            />
            {errors.user_id && (
              <p className="text-red-500 text-xs italic">{errors.user_id}</p>
            )}
          </div>
          {/* Add similar input fields for other user data (email, password, etc.) */}
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.first_name ? "border-red-500" : ""}`}
              id="first_name"
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.last_name ? "border-red-500" : ""}`}
              id="last_name"
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? "border-red-500" : ""}`}
              id="phone"
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? "border-red-500" : ""}`}
              id="address"
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic">{errors.address}</p>
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
