import React, { useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateContractorForm() {
  const history = useNavigate();
  const [contractorData, setContractorData] = useState({
    companyName: '',
    contractID: '',
    registrationID: '',
    registrationDate: '',
    TIN: '',
    contactNumber: '',
    workforceSize: '',
    paymentPerTonnage: '',
    requiredAmountPerDay: '',
    contractDuration: '',
    areaOfCollection: '',
    designatedSTS: ''
  });

  const [errors, setErrors] = useState({
    companyName: '',
    contractID: '',
    registrationID: '',
    registrationDate: '',
    TIN: '',
    contactNumber: '',
    workforceSize: '',
    paymentPerTonnage: '',
    requiredAmountPerDay: '',
    contractDuration: '',
    areaOfCollection: '',
    designatedSTS: ''
  });

  const handleInputChange = (e) => {
    setContractorData({
      ...contractorData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
  
    // Validate Company Name
    if (!contractorData.companyName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        companyName: "Company Name can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Contract ID
    if (!contractorData.contractID.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contractID: "Contract ID can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Registration ID
    if (!contractorData.registrationID.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        registrationID: "Registration ID can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Registration Date
    if (!contractorData.registrationDate.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        registrationDate: "Registration Date can't be empty",
      }));
      isValid = false;
    }
  
    // Validate TIN of the company
    if (!contractorData.TIN.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        TIN: "TIN of the company can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Contact number
    if (!contractorData.contactNumber.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactNumber: "Contact number can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Workforce size
    if (!contractorData.workforceSize.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        workforceSize: "Workforce size can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Payment per tonnage of waste
    if (!contractorData.paymentPerTonnage.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        paymentPerTonnage: "Payment per tonnage of waste can't be empty",
      }));
      isValid = false;
    }
  
    // Validate The required amount of waste per day
    if (!contractorData.requiredAmountPerDay.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        requiredAmountPerDay: "The required amount of waste per day can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Contract duration
    if (!contractorData.contractDuration.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contractDuration: "Contract duration can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Area of collection
    if (!contractorData.areaOfCollection.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        areaOfCollection: "Area of collection can't be empty",
      }));
      isValid = false;
    }
  
    // Validate Designated STS
    if (!contractorData.designatedSTS.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        designatedSTS: "Designated STS can't be empty",
      }));
      isValid = false;
    }
  
    return isValid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log(contractorData);
      const response = await axios.post('http://localhost:8000/contractors', contractorData);
      console.log('Response from API:', response.data);
      
      // Reset form after successful submission
      history('/admin/all_contractors');
      window.location.reload();
      setContractorData({
        companyName: '',
        contractID: '',
        registrationID: '',
        registrationDate: '',
        TIN: '',
        contactNumber: '',
        workforceSize: '',
        paymentPerTonnage: '',
        requiredAmountPerDay: '',
        contractDuration: '',
        areaOfCollection: '',
        designatedSTS: ''
      });
    } catch (error) {
      console.error('Error inserting contractor data:', error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-8">
        <h1 className="mt-10 text-3xl font-semibold text-center text-purple-700">
          Register New Contractor
        </h1>
        <form className="" onSubmit={handleSubmit}>
          {/* Name of the company */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Name of the company
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.companyName ? "border-red-500" : ""}`}
              id="companyName"
              type="text"
              name="companyName"
              value={contractorData.companyName}
              onChange={handleInputChange}
              placeholder="Name of the company"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs italic">{errors.companyName}</p>
            )}
          </div>
  
          {/* Contract ID */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractID">
              Contract ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.contractID ? "border-red-500" : ""}`}
              id="contractID"
              type="text"
              name="contractID"
              value={contractorData.contractID}
              onChange={handleInputChange}
              placeholder="Contract ID"
            />
            {errors.contractID && (
              <p className="text-red-500 text-xs italic">{errors.contractID}</p>
            )}
          </div>
  
          {/* Registration ID */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationID">
              Registration ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.registrationID ? "border-red-500" : ""}`}
              id="registrationID"
              type="text"
              name="registrationID"
              value={contractorData.registrationID}
              onChange={handleInputChange}
              placeholder="Registration ID"
            />
            {errors.registrationID && (
              <p className="text-red-500 text-xs italic">{errors.registrationID}</p>
            )}
          </div>
  
          {/* Registration Date */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationDate">
              Registration Date
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.registrationDate ? "border-red-500" : ""}`}
              id="registrationDate"
              type="date"
              name="registrationDate"
              value={contractorData.registrationDate}
              onChange={handleInputChange}
              placeholder="Registration Date"
            />
            {errors.registrationDate && (
              <p className="text-red-500 text-xs italic">{errors.registrationDate}</p>
            )}
          </div>
  
          {/* TIN of the company */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TIN">
              TIN of the company
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.TIN ? "border-red-500" : ""}`}
              id="TIN"
              type="text"
              name="TIN"
              value={contractorData.TIN}
              onChange={handleInputChange}
              placeholder="TIN of the company"
            />
            {errors.TIN && (
              <p className="text-red-500 text-xs italic">{errors.TIN}</p>
            )}
          </div>
  
          {/* Contact number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
              Contact number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.contactNumber ? "border-red-500" : ""}`}
              id="contactNumber"
              type="tel"
              name="contactNumber"
              value={contractorData.contactNumber}
              onChange={handleInputChange}
              placeholder="Contact number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs italic">{errors.contactNumber}</p>
            )}
          </div>
  
          {/* Workforce size */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workforceSize">
              Workforce size
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.workforceSize ? "border-red-500" : ""}`}
              id="workforceSize"
              type="number"
              name="workforceSize"
              value={contractorData.workforceSize}
              onChange={handleInputChange}
              placeholder="Workforce size"
            />
            {errors.workforceSize && (
              <p className="text-red-500 text-xs italic">{errors.workforceSize}</p>
            )}
          </div>
  
          {/* Payment per tonnage of waste */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentPerTonnage">
              Payment per tonnage of waste
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.paymentPerTonnage ? "border-red-500" : ""}`}
              id="paymentPerTonnage"
              type="text"
              name="paymentPerTonnage"
              value={contractorData.paymentPerTonnage}
              onChange={handleInputChange}
              placeholder="Payment per tonnage of waste"
            />
            {errors.paymentPerTonnage && (
              <p className="text-red-500 text-xs italic">{errors.paymentPerTonnage}</p>
            )}
          </div>
  
          {/* The required amount of waste per day */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requiredAmountPerDay">
              The required amount of waste per day
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.requiredAmountPerDay ? "border-red-500" : ""}`}
              id="requiredAmountPerDay"
              type="text"
              name="requiredAmountPerDay"
              value={contractorData.requiredAmountPerDay}
              onChange={handleInputChange}
              placeholder="The required amount of waste per day"
            />
            {errors.requiredAmountPerDay && (
              <p className="text-red-500 text-xs italic">{errors.requiredAmountPerDay}</p>
            )}
          </div>
  
          {/* Contract duration */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractDuration">
              Contract duration
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.contractDuration ? "border-red-500" : ""}`}
              id="contractDuration"
              type="text"
              name="contractDuration"
              value={contractorData.contractDuration}
              onChange={handleInputChange}
              placeholder="Contract duration"
            />
            {errors.contractDuration && (
              <p className="text-red-500 text-xs italic">{errors.contractDuration}</p>
            )}
          </div>
  
          {/* Area of collection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaOfCollection">
              Area of collection
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.areaOfCollection ? "border-red-500" : ""}`}
              id="areaOfCollection"
              type="text"
              name="areaOfCollection"
              value={contractorData.areaOfCollection}
              onChange={handleInputChange}
              placeholder="Area of collection"
            />
            {errors.areaOfCollection && (
              <p className="text-red-500 text-xs italic">{errors.areaOfCollection}</p>
            )}
          </div>
  
          {/* Designated STS */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designatedSTS">
              Designated STS
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.designatedSTS ? "border-red-500" : ""}`}
              id="designatedSTS"
              type="text"
              name="designatedSTS"
              value={contractorData.designatedSTS}
              onChange={handleInputChange}
              placeholder="Designated STS"
            />
            {errors.designatedSTS && (
              <p className="text-red-500 text-xs italic">{errors.designatedSTS}</p>
            )}
          </div>
  
          <div className="pt-6 flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register Contractor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}
