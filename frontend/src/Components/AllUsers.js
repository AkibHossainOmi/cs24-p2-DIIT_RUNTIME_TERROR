import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// Dummy user data
const dummyUsers = [
  { id: 1, name: 'John Doe', role: 'Admin' },
  { id: 2, name: 'Jane Smith', role: 'STS Manager' },
  { id: 3, name: 'Alice Johnson', role: 'Landfill Manager' },
  { id: 4, name: 'Bob Brown', role: 'STS Manager' },
  // Add more dummy users
  { id: 5, name: 'Sarah Johnson', role: 'Admin' },
  { id: 6, name: 'Michael Jackson', role: 'Landfill Manager' },
  { id: 7, name: 'Emma Watson', role: 'STS Manager' },
  { id: 8, name: 'David Smith', role: 'Admin' },
  { id: 9, name: 'Olivia Williams', role: 'Landfill Manager' },
  { id: 10, name: 'James Brown', role: 'STS Manager' },
  { id: 11, name: 'Emily Davis', role: 'Admin' },
  { id: 12, name: 'William Wilson', role: 'Landfill Manager' },
  { id: 13, name: 'Sophia Anderson', role: 'STS Manager' },
  { id: 14, name: 'Daniel Harris', role: 'Admin' },
  { id: 15, name: 'Chloe Taylor', role: 'Landfill Manager' },
  { id: 16, name: 'Matthew Martinez', role: 'STS Manager' },
  { id: 17, name: 'Ava Garcia', role: 'Admin' },
  { id: 18, name: 'Ethan Lopez', role: 'Landfill Manager' },
  { id: 19, name: 'Isabella Lee', role: 'STS Manager' },
  { id: 20, name: 'Mia Rodriguez', role: 'Admin' },
];

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name

  useEffect(() => {
    // Simulate fetching users from the backend
    setTimeout(() => {
      setUsers(dummyUsers);
    }, 1000); // Simulate 1 second delay
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users based on the selected criteria
  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.role.localeCompare(b.role);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">All Users</h1>
            {/* Search and sort container */}
            <div className="flex justify-between mb-4">
              {/* Search input field */}
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
              />
              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 max-w-xs" // Added pr-8 for right padding
              >
                <option value="name">Name</option>
                <option value="role">Role</option>
              </select>
            </div>
            <div className="divide-y divide-gray-200">
              {/* Render sorted and filtered users */}
              {sortedUsers.map(user => (
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
