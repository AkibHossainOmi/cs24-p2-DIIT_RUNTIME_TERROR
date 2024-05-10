import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AllContractors = () => {
  const [contractors, setContractors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name

  useEffect(() => {
    fetch('http://localhost:8000/contractors') // Assuming the endpoint for fetching contractors is different
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setContractors(data.data);
        } else {
          console.error('Error fetching contractors:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching contractors:', error);
      });
  }, []);

  // Filter contractors based on search term
  const filteredContractors = contractors.filter(contractor =>
    contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort contractors based on the selected criteria
  const sortedContractors = filteredContractors.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.type.localeCompare(b.type);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">All Contractors</h1>
            {/* Search and sort container */}
            <div className="flex justify-between mb-4">
              {/* Search input field */}
              <input
                type="text"
                placeholder="Search contractors..."
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
                <option value="type">Type</option>
              </select>
            </div>
            <div className="divide-y divide-gray-200">
              {/* Render sorted and filtered contractors */}
              {sortedContractors.map(contractor => (
                <div key={contractor.contractorId} className="py-4">
                  <Link to={`/contractors/${contractor.contractorId}`} className="text-lg font-semibold text-black-500 hover: ">{contractor.name}</Link>
                  <p className="text-sm text-gray-600">{contractor.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllContractors;
