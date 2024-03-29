import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('username'); // Default sort by username

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setUsers(data.data);
        } else {
          console.error('Error fetching users:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users based on the selected criteria
  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === 'username') {
      return a.username.localeCompare(b.username);
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
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">All Users</h1>
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
                <option value="username">Username</option>
                <option value="role">Role</option>
              </select>
            </div>
            <div className="divide-y divide-gray-200">
              {/* Render sorted and filtered users */}
              {sortedUsers.map(user => (
                <div key={user.userId} className="py-4">
                  <Link to={`/users/${user.userId}`} className="text-lg font-semibold text-black-500 hover:underline">{user.username}</Link>
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
