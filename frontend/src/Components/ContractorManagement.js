import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ContractorManagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Contractor Management</h1>
            <div className="flex flex-col space-y-4">
              <Link
                to="/admin/create_contractor"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                Create Contractor
              </Link>
              <Link
                to="/admin/all_contractors"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              >
                All Contractors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorManagement;
