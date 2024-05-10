import React, { useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

export default function WorkforceRegistrationPage() {
  const history = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    employeeId: '',
    fullName: '',
    dateOfBirth: '',
    dateOfHire: '',
    jobTitle: '',
    paymentRatePerHour: '',
    contactInformation: '',
    assignedCollectionRoute: '',
  });

  const [errors, setErrors] = useState({
    employeeId: '',
    fullName: '',
    dateOfBirth: '',
    dateOfHire: '',
    jobTitle: '',
    paymentRatePerHour: '',
    contactInformation: '',
    assignedCollectionRoute: '',
  });

  const handleInputChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    for (const key in employeeData) {
      if (!employeeData[key].trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: `${key.replace(/([A-Z])/g, ' $1').trim()} can't be empty`,
        }));
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/workforce-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Workforce registration submitted successfully');
        // Reset form after successful submission
        history('/dashboard');
        window.location.reload();
      } else {
        console.error('Error submitting workforce registration:', responseData.error);
        // Handle error scenario
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Handle unexpected errors, e.g., network issues
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700  ">
          Workforce Registration
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.employeeId ? "border-red-500" : ""}`}
              id="employeeId"
              type="text"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleInputChange}
              placeholder="Employee ID"
            />
            {errors.employeeId && (
              <p className="text-red-500 text-xs italic">{errors.employeeId}</p>
            )}
          </div>
          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fullName ? "border-red-500" : ""}`}
              id="fullName"
              type="text"
              name="fullName"
              value={employeeData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs italic">{errors.fullName}</p>
            )}
          </div>
          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfBirth ? "border-red-500" : ""}`}
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={employeeData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="Date of Birth"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs italic">{errors.dateOfBirth}</p>
            )}
          </div>
          {/* Date of Hire */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfHire">
              Date of Hire
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfHire ? "border-red-500" : ""}`}
              id="dateOfHire"
              type="date"
              name="dateOfHire"
              value={employeeData.dateOfHire}
              onChange={handleInputChange}
              placeholder="Date of Hire"
            />
            {errors.dateOfHire && (
              <p className="text-red-500 text-xs italic">{errors.dateOfHire}</p>
            )}
          </div>
          {/* Job Title */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobTitle">
              Job Title
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.jobTitle ? "border-red-500" : ""}`}
              id="jobTitle"
              type="text"
              name="jobTitle"
              value={employeeData.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs italic">{errors.jobTitle}</p>
            )}
          </div>
          {/* Payment rate per hour */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentRatePerHour">
              Payment rate per hour
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.paymentRatePerHour ? "border-red-500" : ""}`}
              id="paymentRatePerHour"
              type="number"
              name="paymentRatePerHour"
              value={employeeData.paymentRatePerHour}
              onChange={handleInputChange}
              placeholder="Payment rate per hour"
            />
            {errors.paymentRatePerHour && (
              <p className="text-red-500 text-xs italic">{errors.paymentRatePerHour}</p>
            )}
          </div>
          {/* Contact Information */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactInformation">
              Contact Information
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.contactInformation ? "border-red-500" : ""}`}
              id="contactInformation"
              type="text"
              name="contactInformation"
              value={employeeData.contactInformation}
              onChange={handleInputChange}
              placeholder="Contact Information"
            />
            {errors.contactInformation && (
              <p className="text-red-500 text-xs italic">{errors.contactInformation}</p>
            )}
          </div>
          {/* Assigned Collection Route */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedCollectionRoute">
              Assigned Collection Route
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.assignedCollectionRoute ? "border-red-500" : ""}`}
              id="assignedCollectionRoute"
              type="text"
              name="assignedCollectionRoute"
              value={employeeData.assignedCollectionRoute}
              onChange={handleInputChange}
              placeholder="Assigned Collection Route"
            />
            {errors.assignedCollectionRoute && (
              <p className="text-red-500 text-xs italic">{errors.assignedCollectionRoute}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
