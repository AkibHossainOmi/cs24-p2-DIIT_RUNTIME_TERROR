import React, { useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Map from './Map';

export default function CreateStationForm() {
  const history = useNavigate();
  const [stationData, setStationData] = useState({
    WardNumber: '',
    CapacityInTonnes: '',
    address: '',
    Longitude: '',
    Latitude: '',
    fineForCompensation: '', // Added new fine for compensation parameter
    collectionStartTime: '', // Added new parameter for collection start time
    collectionEndTime: '' // Added new parameter for collection end time
  });

  const [errors, setErrors] = useState({
    WardNumber: '',
    CapacityInTonnes: '',
    address: '',
    Longitude: '',
    Latitude: '',
    fineForCompensation: '', // Added corresponding error state
    collectionStartTime: '', // Added corresponding error state
    collectionEndTime: '' // Added corresponding error state
  });

  const handleInputChange = (e) => {
    setStationData({
      ...stationData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { WardNumber, CapacityInTonnes, address, Longitude, Latitude, fineForCompensation, collectionStartTime, collectionEndTime } = stationData;

    if (!WardNumber.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        WardNumber: "Ward Number can't be empty",
      }));
      isValid = false;
    }

    // Add validation for other fields (e.g., CapacityInTonnes, address, Longitude, Latitude, fineForCompensation, collectionStartTime, collectionEndTime)

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log(stationData);
      const response = await axios.post('http://localhost:8000/sts', stationData);
      console.log('Response from API:', response.data);
      
      // Reset form after successful submission
      history('/admin/all_sts');
      window.location.reload();
      setStationData({
        WardNumber: '',
        CapacityInTonnes: '',
        address: '',
        Longitude: '',
        Latitude: '',
        fineForCompensation: '', // Reset the new parameter as well
        collectionStartTime: '', // Reset the new parameter as well
        collectionEndTime: '' // Reset the new parameter as well
      });
    } catch (error) {
      console.error('Error inserting STS data:', error);
    }
  };

  const handleLatLngChange = (lat, lng, add) => {
    setStationData({
      ...stationData,
      Latitude: lat,
      Longitude: lng,
      address: add,
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-8">
        <h1 className="mt-10 text-3xl font-semibold text-center text-purple-700  ">
          Create STS
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="WardNumber">
              Ward Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.WardNumber ? "border-red-500" : ""}`}
              id="WardNumber"
              type="text"
              name="WardNumber"
              value={stationData.WardNumber}
              onChange={handleInputChange}
              placeholder="Ward Number"
            />
            {errors.WardNumber && (
              <p className="text-red-500 text-xs italic">{errors.WardNumber}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CapacityInTonnes">
              Capacity
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.CapacityInTonnes ? "border-red-500" : ""}`}
              id="CapacityInTonnes"
              type="text"
              name="CapacityInTonnes"
              value={stationData.CapacityInTonnes}
              onChange={handleInputChange}
              placeholder="Capacity"
            />
            {errors.CapacityInTonnes && (
              <p className="text-red-500 text-xs italic">{errors.CapacityInTonnes}</p>
            )}
          </div>
          {/* New input field for fine for compensation */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fineForCompensation">
              Fine for Compensation
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fineForCompensation ? "border-red-500" : ""}`}
              id="fineForCompensation"
              type="text"
              name="fineForCompensation"
              value={stationData.fineForCompensation}
              onChange={handleInputChange}
              placeholder="Fine for Compensation"
            />
            {errors.fineForCompensation && (
              <p className="text-red-500 text-xs italic">{errors.fineForCompensation}</p>
            )}
          </div>
          {/* New input fields for collection start time and end time */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectionStartTime">
              Collection Start Time
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.collectionStartTime ? "border-red-500" : ""}`}
              id="collectionStartTime"
              type="time"
              name="collectionStartTime"
              value={stationData.collectionStartTime}
              onChange={handleInputChange}
              placeholder="Collection Start Time"
            />
            {errors.collectionStartTime && (
              <p className="text-red-500 text-xs italic">{errors.collectionStartTime}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectionEndTime">
              Collection End Time
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.collectionEndTime ? "border-red-500" : ""}`}
              id="collectionEndTime"
              type="time"
              name="collectionEndTime"
              value={stationData.collectionEndTime}
              onChange={handleInputChange}
              placeholder="Collection End Time"
            />
            {errors.collectionEndTime && (
              <p className="text-red-500 text-xs italic">{errors.collectionEndTime}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <Map onLatLngChange={handleLatLngChange} />
          </div>
          
          <div className="pt-24 flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
