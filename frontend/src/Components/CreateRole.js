import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const CreateRole = () => {
  const history = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [availablePermissions] = useState([
    'Add Entry of Vehicles',
    'Create STS',
    'Add Vehicles',
    'Assign Roles',
    'Assign Permissions',
    'Update Profile',
    'Create User'
  ]);
  const [availableRoles] = useState([
    'System Admin',
    'Landfill Manager',
    'STS Manager',
    'Unassigned'
  ]);

  const handlePermissionChange = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(perm => perm !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let ID;
      // Make an HTTP POST request to the backend endpoint
      if(roleName === 'System Admin') ID = 1;
      if(roleName === 'STS Manager') ID = 2;
      if(roleName === 'Landfill Manager') ID = 3;
      if(roleName === 'Unassigned') ID = 4;
      const response = await axios.post(`http://localhost:8000/rbac/roles/${ID}/permissions`, { permissions: selectedPermissions });
      
      // Handle success response
      console.log(response.data.message); // Log success message
      
      // Reset form fields after submission
      history('/control');
      window.location.reload();
      setRoleName('');
      setSelectedPermissions([]);
    } catch (error) {
      // Handle error
      console.error('Error assigning permissions:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700   mb-2">Assign Permissions</h2>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Role Name:</label>
                <select
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                >
                  <option value="">Select Role</option>
                  {availableRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Permissions:</label>
                {availablePermissions.map(permission => (
                  <div key={permission} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        className="mr-2"
                      />
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
              <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
