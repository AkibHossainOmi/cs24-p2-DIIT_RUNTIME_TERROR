import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { clearUserStatus, getCurrentUserId, getLoggedInStatus, setLoggedIn } from "./Status";
import Navbar from "./Navbar";
import axios from "axios";

const UserProfile = () => {
  const isAuthenticated = getLoggedInStatus();
  const [userInfo, setUserInfo] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const userId = getCurrentUserId();

    if (!userId) {
      setError("Unauthorized");
      return;
    }

    // Fetch user basic information
    axios.get(`http://localhost:8000/users/${userId}`)
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        setError("Failed to fetch user profile");
        console.error("Error fetching user profile:", error);
      });

    // Fetch additional user details
    axios.get(`http://localhost:8000/profile`, {
      headers: {
        userid: userId
      }
    })
      .then(response => {
        setUserInfo(prevState => ({
          ...prevState,
          ...response.data
        }));
      })
      .catch(error => {
        console.error("Error fetching additional user details:", error);
      });

    // Fetch permissions for the role
    axios.get(`http://localhost:8000/roles/${getLoggedInStatus()}/permissions`)
      .then(response => {
        setPermissions(response.data.permissions);
      })
      .catch(error => {
        setError("Failed to fetch permissions");
        console.error("Error fetching permissions:", error);
      });
  }, []);

  const confirmDeleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser();
      clearUserStatus();
      history('/registration');
      window.location.reload();
      // alert('User deleted successfully!');
    }
  };

  const deleteUser = () => {
    const userId = getCurrentUserId();

    axios.delete(`http://localhost:8000/users/${userId}`)
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h2 className="text-3xl font-semibold text-center text-purple-700 underline mb-2">User Profile</h2>
        <hr className="mb-4" />
        {userInfo && (
          <form className="px-6 py-4">
            <div className="mb-4">
              <label className="block mb-1">Role:</label>
              <p className="border p-2">{userInfo.role}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">User ID:</label>
              <p className="border p-2">{userInfo.userId}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Username:</label>
              <p className="border p-2">{userInfo.username}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <p className="border p-2">{userInfo.email}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">First Name:</label>
              <p className="border p-2">{userInfo.first_name}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Last Name:</label>
              <p className="border p-2">{userInfo.last_name}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone:</label>
              <p className="border p-2">{userInfo.phone}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Address:</label>
              <p className="border p-2">{userInfo.address}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Permissions:</label>
              <ul className="border p-2">
                {permissions.map(permission => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <Link to="/editprofile" className="text-blue-500 hover:underline">Edit Profile</Link>
              {isAuthenticated === "1" &&
                (
                  <button onClick={confirmDeleteUser} className="text-red-500 hover:underline">
                    Delete User
                  </button>
                )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
