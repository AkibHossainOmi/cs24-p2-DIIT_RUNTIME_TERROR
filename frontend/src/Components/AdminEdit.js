import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { getCurrentUserId, getLoggedInStatus } from './Status';

const AdminEdit = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    role: '', 
  });
  const { userId } = useParams();
  const roleId = getLoggedInStatus();
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

  const handleSubmit = (e) => {
    e.preventDefault();
      // Update user profile

      // Assign user role
      axios.put(`http://localhost:8000/users/${userId}/roles`, { role: userData.role });
      alert('Profile updated successfully!');
      history(`/users/${userId}`);
    //   window.location.reload();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700 pb-5">Assign Role</h2>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit}>
              {/* Role dropdown */}
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
                    <option value="Contractor Manager">Contractor Manager</option>

                  </select>
                </div>

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
                <Link to="/user/change_password" className="text-blue-500 hover: ">Change Password</Link>
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

export default AdminEdit;
