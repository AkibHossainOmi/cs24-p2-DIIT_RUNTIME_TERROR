import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const UserManagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">User Management</h1>
            <div className="flex flex-col space-y-4">
              <Link
                to="/admin/create_user"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                Create User
              </Link>
              <Link
                to="/admin/all_users"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                All Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
