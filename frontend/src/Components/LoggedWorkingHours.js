import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const LoggedWorkingHours = () => {
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

  // Calculate total hours worked per day
  const calculateTotalHours = (logInTime, logOutTime) => {
    const diffInMs = new Date(logOutTime) - new Date(logInTime);
    return Math.floor(diffInMs / (1000 * 60 * 60)); // Convert milliseconds to hours
  };

  // Calculate overtime hours
  const calculateOvertime = (totalHoursWorked) => {
    const standardWorkingHours = 8; // Assuming 8 hours per day is standard
    return totalHoursWorked > standardWorkingHours ? totalHoursWorked - standardWorkingHours : 0;
  };

  // Function to handle marking an absence
  const markAbsence = (employeeId) => {
    // Implement your logic to mark absence for the employee with the given ID
    console.log(`Marking absence for employee with ID ${employeeId}`);
  };

  // Function to handle requesting a leave
  const requestLeave = (employeeId) => {
    // Implement your logic to request leave for the employee with the given ID
    console.log(`Requesting leave for employee with ID ${employeeId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Logged Working Hours</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">{employee.fullName}</h2>
              <p className="text-gray-600 mb-2">Employee ID: {employee.employeeId}</p>
              <p className="text-gray-600 mb-2">Job Title: {employee.jobTitle}</p>
              <p className="text-gray-600 mb-2">Contact Information: {employee.contactInformation}</p>
              <p className="text-gray-600 mb-2">Assigned Collection Route: {employee.assignedCollectionRoute}</p>
              {/* Assume daily log-in and log-out times are stored in employee object */}
              <p className="text-gray-600 mb-2">Log-in Time: {employee.logInTime}</p>
              <p className="text-gray-600 mb-2">Log-out Time: {employee.logOutTime}</p>
              {/* Calculate total hours worked and overtime */}
              <p className="text-gray-600 mb-2">Total Hours Worked: {calculateTotalHours(employee.logInTime, employee.logOutTime)} hours</p>
              <p className="text-gray-600 mb-2">Overtime Hours: {calculateOvertime(calculateTotalHours(employee.logInTime, employee.logOutTime))} hours</p>
              {/* Add controls for managing absences and leaves */}
              <div className="flex justify-between">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => markAbsence(employee.id)}>Mark Absence</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => requestLeave(employee.id)}>Request Leave</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoggedWorkingHours;
