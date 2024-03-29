import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { getCurrentUserId, getLoggedInStatus } from './Status';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    role: '', 
  });

  const roleId = getLoggedInStatus();
  const userId = getCurrentUserId();
  const history = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setUserData({ ...userData, permissions: [...userData.permissions, value] });
      } else {
        setUserData({ ...userData, permissions: userData.permissions.filter(permission => permission !== value) });
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user profile
      await axios.put('http://localhost:8000/profile', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        Phone: userData.phone,
        Address: userData.address
      }, 
      {headers: {
        userid: userId
      }});

      // Assign user role
      await axios.put(`http://localhost:8000/users/${userId}/roles`, { role: userData.role });
      alert('Profile updated successfully!');
      history('/profile');
      window.location.reload();
    } catch (error) { 
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700 underline mb-2">Edit Profile</h2>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit}>
              {/* First Name field */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>
              {/* Last Name field */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>
              {/* Phone field */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>
              {/* Address field */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Address:</label>
                <textarea
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                ></textarea>
              </div>
              {/* Role dropdown */}
              {roleId === "1" && (
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Role:</label>
                  <select
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="System Admin">System Admin</option>
                    <option value="STS Manager">STS Manager</option>
                    <option value="Landfill Manager">Landfill Manager</option>
                  </select>
                </div>
              )}

              {/* <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Permissions:</label>
                <div>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="permissions"
      value="Create STS"
      checked={userData.permissions.includes('Create STS')}
      onChange={handleChange}
      className="form-checkbox h-5 w-5 text-purple-600"
    />
    <span className="ml-2">Create STS</span>
  </label>
</div>
<div>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="permissions"
      value="Add Vehicles"
      checked={userData.permissions.includes('Add Vehicles')}
      onChange={handleChange}
      className="form-checkbox h-5 w-5 text-purple-600"
    />
    <span className="ml-2">Add Vehicles</span>
  </label>
</div>
<div>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="permissions"
      value="Assign Roles"
      checked={userData.permissions.includes('Assign Roles')}
      onChange={handleChange}
      className="form-checkbox h-5 w-5 text-purple-600"
    />
    <span className="ml-2">Assign Roles</span>
  </label>
</div>
<div>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="permissions"
      value="Assign Permissions"
      checked={userData.permissions.includes('Assign Permissions')}
      onChange={handleChange}
      className="form-checkbox h-5 w-5 text-purple-600"
    />
    <span className="ml-2">Assign Permissions</span>
  </label>
</div>
<div>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="permissions"
      value="Update Profile"
      checked={userData.permissions.includes('Update Profile')}
      onChange={handleChange}
      className="form-checkbox h-5 w-5 text-purple-600"
    />
    <span className="ml-2">Update Profile</span>
  </label>
</div>
<div>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="permissions"
      value="Create User"
      checked={userData.permissions.includes('Create User')}
      onChange={handleChange}
      className="form-checkbox h-5 w-5 text-purple-600"
    />
    <span className="ml-2">Create User</span>
  </label>
</div>

              </div> */}
              {/* Link to change password */}
              <div className="mb-4">
                <Link to="/user/change_password" className="text-blue-500 hover:underline">Change Password</Link>
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default EditProfile;
