import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const AllContractorManagers = () => {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('username'); // Default sort by username

  useEffect(() => {
    const fetchContractorManagers = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_URL_HERE');
        if (response.status === 200) {
          setManagers(response.data);
        } else {
          console.error('Error fetching contractor managers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching contractor managers:', error.message);
      }
    };

    fetchContractorManagers();
  }, []);

  // Filter managers based on search term
  const filteredManagers = managers.filter(manager =>
    manager.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort managers based on the selected criteria
  const sortedManagers = filteredManagers.sort((a, b) => {
    if (sortBy === 'username') {
      return a.username.localeCompare(b.username);
    } else {
      return a.accessLevel.localeCompare(b.accessLevel);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">All Contractor Managers</h1>
            {/* Search and sort container */}
            <div className="flex justify-between mb-4">
              {/* Search input field */}
              <input
                type="text"
                placeholder="Search managers..."
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
                <option value="accessLevel">Access Level</option>
              </select>
            </div>
            <div className="divide-y divide-gray-200">
              {/* Render sorted and filtered managers */}
              {sortedManagers.map(manager => (
                <div key={manager.userId} className="py-4">
                  <Link to={`/contractor_managers/${manager.userId}`} className="text-lg font-semibold text-black-500 hover: ">{manager.username}</Link>
                  <p className="text-sm text-gray-600">Access Level: {manager.accessLevel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllContractorManagers;
