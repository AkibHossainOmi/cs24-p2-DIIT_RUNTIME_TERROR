// AllUsers.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// Dummy user data
const dummyUsers = [
  { id: 1, name: 'John Doe', role: 'Admin' },
  { id: 2, name: 'Jane Smith', role: 'STS Maneger' },
  { id: 3, name: 'Alice Johnson', role: 'Landfill Maneger' },
  { id: 4, name: 'Bob Brown', role: 'STS Maneger' },
];

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching users from the backend
    setTimeout(() => {
      setUsers(dummyUsers);
    }, 1000); // Simulate 1 second delay
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">All Users</h1>
            <div className="divide-y divide-gray-200">
              {users.map(user => (
                <div key={user.id} className="py-4">
                  <Link to={`/user/${user.id}`} className="text-lg font-semibold text-black-500 hover:underline">{user.name}</Link>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
