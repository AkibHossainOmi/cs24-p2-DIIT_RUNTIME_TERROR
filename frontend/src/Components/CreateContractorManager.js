import React, { useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateContractorManager() {
  const history = useNavigate();
  const [managerData, setManagerData] = useState({
    fullName: '',
    userID: '',
    emailAddress: '',
    dateOfAccountCreation: '',
    contactNumber: '',
    assignedContractorCompany: '',
    accessLevel: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    userID: '',
    emailAddress: '',
    dateOfAccountCreation: '',
    contactNumber: '',
    assignedContractorCompany: '',
    accessLevel: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setManagerData({
      ...managerData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
  
    // Validate Full Name
    if (!managerData.fullName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: "Full Name can't be empty",
      }));
      isValid = false;
    }
  
    // Validate User ID
    if (!managerData.userID.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userID: "User ID can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Email Address
    if (!managerData.emailAddress.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailAddress: "Email Address can't be empty",
      }));
      isValid = false;
    }
  
    // Add validations for other fields here...
  
    return isValid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log(managerData);
      const response = await axios.post('http://localhost:8000/create-contractor-manager', managerData);
      console.log('Response from API:', response.data);
      
      // Reset form after successful submission
      history('/admin/all_contractor_managers');
      window.location.reload();
      setManagerData({
        fullName: '',
        userID: '',
        emailAddress: '',
        dateOfAccountCreation: '',
        contactNumber: '',
        assignedContractorCompany: '',
        accessLevel: '',
        username: '',
        password: ''
      });
    } catch (error) {
      console.error('Error creating contractor manager:', error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-8">
        <h1 className="mb-6 mt-10 text-3xl font-semibold text-center text-purple-700">
          Creation of Contractor Manager
        </h1>
        <form className="" onSubmit={handleSubmit}>
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
              value={managerData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs italic">{errors.fullName}</p>
            )}
          </div>
  
          {/* User ID */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userID">
              User ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.userID ? "border-red-500" : ""}`}
              id="userID"
              type="text"
              name="userID"
              value={managerData.userID}
              onChange={handleInputChange}
              placeholder="User ID"
            />
            {errors.userID && (
              <p className="text-red-500 text-xs italic">{errors.userID}</p>
            )}
          </div>
  
          {/* Email Address */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailAddress">
              Email Address
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.emailAddress ? "border-red-500" : ""}`}
              id="emailAddress"
              type="email"
              name="emailAddress"
              value={managerData.emailAddress}
              onChange={handleInputChange}
              placeholder="Email Address"
            />
            {errors.emailAddress && (
              <p className="text-red-500 text-xs italic">{errors.emailAddress}</p>
            )}
          </div>
  
          {/* Date of Account Creation */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfAccountCreation">
              Date of Account Creation
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfAccountCreation ? "border-red-500" : ""}`}
              id="dateOfAccountCreation"
              type="date"
              name="dateOfAccountCreation"
              value={managerData.dateOfAccountCreation}
              onChange={handleInputChange}
              placeholder="Date of Account Creation"
            />
            {errors.dateOfAccountCreation && (
              <p className="text-red-500 text-xs italic">{errors.dateOfAccountCreation}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.contactNumber ? "border-red-500" : ""}`}
              id="contactNumber"
              type="text"
              name="contactNumber"
              value={managerData.contactNumber}
              onChange={handleInputChange}
              placeholder="Contact Number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs italic">{errors.contactNumber}</p>
            )}
          </div>

          {/* Assigned Contractor Company */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedContractorCompany">
              Assigned Contractor Company
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.assignedContractorCompany ? "border-red-500" : ""}`}
              id="assignedContractorCompany"
              type="text"
              name="assignedContractorCompany"
              value={managerData.assignedContractorCompany}
              onChange={handleInputChange}
              placeholder="Assigned Contractor Company"
            />
            {errors.assignedContractorCompany && (
              <p className="text-red-500 text-xs italic">{errors.assignedContractorCompany}</p>
            )}
          </div>

          {/* Access Level */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accessLevel">
              Access Level
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.accessLevel ? "border-red-500" : ""}`}
              id="accessLevel"
              type="text"
              name="accessLevel"
              value={managerData.accessLevel}
              onChange={handleInputChange}
              placeholder="Access Level"
            />
            {errors.accessLevel && (
              <p className="text-red-500 text-xs italic">{errors.accessLevel}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? "border-red-500" : ""}`}
              id="username"
              type="text"
              name="username"
              value={managerData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : ""}`}
              id="password"
              type="password"
              name="password"
              value={managerData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Contractor Manager
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
