import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('fullName'); // Default sort by full name

  useEffect(() => {
    fetch('http://localhost:8000/employees')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setEmployees(data.data);
        } else {
          console.error('Error fetching employees:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees based on the selected criteria
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortBy === 'fullName') {
      return a.fullName.localeCompare(b.fullName);
    } else {
      return a.jobTitle.localeCompare(b.jobTitle);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">All Employees</h1>
            {/* Search and sort container */}
            <div className="flex justify-between mb-4">
              {/* Search input field */}
              <input
                type="text"
                placeholder="Search employees..."
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
                <option value="fullName">Full Name</option>
                <option value="jobTitle">Job Title</option>
              </select>
            </div>
            <div className="divide-y divide-gray-200">
              {/* Render sorted and filtered employees */}
              {sortedEmployees.map(employee => (
                <div key={employee.employeeId} className="py-4">
                  <Link to={`/employees/${employee.employeeId}`} className="text-lg font-semibold text-black-500 hover: ">{employee.fullName}</Link>
                  <p className="text-sm text-gray-600">Date of Birth: {employee.dateOfBirth}</p>
                  <p className="text-sm text-gray-600">Date of Hire: {employee.dateOfHire}</p>
                  <p className="text-sm text-gray-600">Job Title: {employee.jobTitle}</p>
                  <p className="text-sm text-gray-600">Payment Rate per Hour: {employee.paymentRatePerHour}</p>
                  <p className="text-sm text-gray-600">Contact Information: {employee.contactInformation}</p>
                  <p className="text-sm text-gray-600">Assigned Collection Route: {employee.assignedCollectionRoute}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployees;
