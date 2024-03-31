import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AdminControlPanel = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700   mb-4">Admin Control Panel</h1>
            <div className="flex flex-col space-y-4">
              <Link
                to="/admin/user_management"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                User Management
              </Link>
              <Link
                to="/admin/vehicle_management"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                Vehicle Management
              </Link>
              <Link
                to="/admin/sts_management"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                STS Management
              </Link>
              <Link
                to="/admin/landfill_management" // Changed the route to '/admin/landfill_management'
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                Landfill Management
              </Link>
              <Link
                to="/admin/create_roles"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                Create Roles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControlPanel;
