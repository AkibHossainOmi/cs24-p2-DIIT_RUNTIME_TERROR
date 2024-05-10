import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const EnterWorkingHours = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // State to store login and logout times for each employee
  const [workingHours, setWorkingHours] = useState({});

  // Update login time for an employee
  const handleLoginTimeChange = (employeeId, loginTime) => {
    setWorkingHours({
      ...workingHours,
      [employeeId]: {
        ...workingHours[employeeId],
        loginTime,
      },
    });
  };

  // Update logout time for an employee
  const handleLogoutTimeChange = (employeeId, logoutTime) => {
    setWorkingHours({
      ...workingHours,
      [employeeId]: {
        ...workingHours[employeeId],
        logoutTime,
      },
    });
  };

  // Submit working hours data to backend
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/enter-working-hours', workingHours);
      console.log('Working hours submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting working hours:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Enter Working Hours</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">{employee.fullName}</h2>
              <p className="text-gray-600 mb-2">Employee ID: {employee.employeeId}</p>
              <p className="text-gray-600 mb-2">Job Title: {employee.jobTitle}</p>
              <p className="text-gray-600 mb-2">Contact Information: {employee.contactInformation}</p>
              {/* Input fields for login and logout times */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`loginTime-${employee.id}`}>
                  Login Time
                </label>
                <input
                  id={`loginTime-${employee.id}`}
                  type="time"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => handleLoginTimeChange(employee.id, e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`logoutTime-${employee.id}`}>
                  Logout Time
                </label>
                <input
                  id={`logoutTime-${employee.id}`}
                  type="time"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => handleLogoutTimeChange(employee.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterWorkingHours;
