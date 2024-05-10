import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const AllCollectionPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Fetch all collection plans from the backend
    axios.get('http://localhost:8000/all-collection-plans')
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching collection plans:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">All Collection Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{plan.area}</h2>
              <p><strong>Start Time:</strong> {plan.startTime}</p>
              <p><strong>Duration:</strong> {plan.duration} hours</p>
              <p><strong>Laborers:</strong> {plan.numLaborers}</p>
              <p><strong>Vans:</strong> {plan.numVans}</p>
              <p><strong>Expected Weight:</strong> {plan.expectedWeight} tons</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCollectionPlans;
