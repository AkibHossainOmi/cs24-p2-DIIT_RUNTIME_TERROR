import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    user_id: '123',
    username: 'example_user',
    email: 'user@example.com',
    password: 'password123',
    first_name: '',
    last_name: '',
    phone: ' '
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordReset = () => {
    // Logic for resetting the password
    alert('Password reset requested!');
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h2 className="text-3xl font-semibold text-center text-purple-700 underline mb-2">User Profile</h2>
        <hr className="mb-4" />
        <form className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">User ID:</label>
            <input
              type="text"
              name="user_id"
              value={userData.user_id}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone:</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Address:</label>
            <textarea
              name="address"
              value={userData.address}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              readOnly
            ></textarea>
          </div>
          <div className="mb-4">
                <Link to="/user/edit_profile" className="text-blue-500 hover:underline">Edit Profile</Link>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
