import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const LoggedWorkingHours = () => {
  const [employeeHours, setEmployeeHours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeHours = async () => {
      try {
        const response = await axios.get('http://localhost:8000/working-hours');
        console.log('Response from API:', response.data);
        // Access the data property of the response object
        const workingHoursData = response.data.data;
        // Group the working hours by employeeId
        const groupedHours = groupHoursByEmployeeId(workingHoursData);
        setEmployeeHours(groupedHours);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee working hours:', error);
        setLoading(false);
      }
    };

    fetchEmployeeHours();
  }, []);

  // Group the working hours by employeeId
  const groupHoursByEmployeeId = (hours) => {
    if (!Array.isArray(hours)) {
      console.error('Expected an array of working hours, but received:', hours);
      return {};
    }

    return hours.reduce((acc, curr) => {
      const employeeId = curr.employeeId;
      if (!acc[employeeId]) {
        acc[employeeId] = [];
      }
      acc[employeeId].push(curr);
      return acc;
    }, {});
  };

  // Calculate total working hours for each employee
  const calculateTotalHours = (hours) => {
    let totalHours = 0;
    hours.forEach((hour) => {
      const diffInMs = new Date(hour.logoutTime) - new Date(hour.loginTime);
      totalHours += Math.floor(diffInMs / (1000 * 60 * 60)); // Convert milliseconds to hours
    });
    return totalHours;
  };

  // Calculate overtime hours for each employee
  const calculateOvertime = (totalHoursWorked) => {
    const standardWorkingHours = 8; // Assuming 8 hours per day is standard
    return totalHoursWorked > standardWorkingHours ? totalHoursWorked - standardWorkingHours : 0;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Logged Working Hours</h1>
        {Object.keys(employeeHours).map((employeeId) => (
          <div key={employeeId} className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Employee ID: {employeeId}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employeeHours[employeeId].map((hour, index) => (
                <div key={index} className="bg-gray-200 rounded-lg overflow-hidden shadow-lg p-4">
                  <p className="text-gray-600 mb-2">Login Time: {hour.loginTime}</p>
                  <p className="text-gray-600 mb-2">Logout Time: {hour.logoutTime}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-4">
              Total Hours Worked: {calculateTotalHours(employeeHours[employeeId])} hours
            </p>
            <p className="text-gray-600">Overtime Hours: {calculateOvertime(calculateTotalHours(employeeHours[employeeId]))} hours</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoggedWorkingHours;
