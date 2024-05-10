import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AllContractors = () => {
  const [contractors, setContractors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name

  useEffect(() => {
    fetch('http://localhost:8000/contractors')
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
    contractor.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort contractors based on the selected criteria
  const sortedContractors = filteredContractors.sort((a, b) => {
    if (sortBy === 'name') {
      return a.company_name.localeCompare(b.company_name);
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
                <div key={contractor.contract_id} className="py-4">
                  <Link to={`/contractors/${contractor.contract_id}`} className="text-lg font-semibold text-black-500 hover: ">{contractor.company_name}</Link>
                  <p className="text-sm text-gray-600">TIN: {contractor.tin}</p>
                  <p className="text-sm text-gray-600">Contact Number: {contractor.contact_number}</p>
                  <p className="text-sm text-gray-600">Workforce Size: {contractor.workforce_size}</p>
                  <p className="text-sm text-gray-600">Payment per Tonnage: {contractor.payment_per_tonnage}</p>
                  <p className="text-sm text-gray-600">Required Amount per Day: {contractor.required_amount_per_day}</p>
                  <p className="text-sm text-gray-600">Contract Duration: {contractor.contract_duration}</p>
                  <p className="text-sm text-gray-600">Area of Collection: {contractor.area_of_collection}</p>
                  <p className="text-sm text-gray-600">Designated STS: {contractor.designated_sts}</p>
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
