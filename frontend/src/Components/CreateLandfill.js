import React, { useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Map from './Map';

export default function CreateLandfillForm() {
  const history = useNavigate();
  const [landfillData, setLandfillData] = useState({
    LandfillID: '',
    capacity: '',
    operationalTimespan: '',
    longitude: '',
    latitude: '',
    address: '', // Add address state
  });

  const [errors, setErrors] = useState({
    LandfillID: '',
    capacity: '',
    operationalTimespan: '',
    longitude: '',
    latitude: '',
  });

  const handleInputChange = (e) => {
    setLandfillData({
      ...landfillData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { LandfillID, capacity, operationalTimespan, longitude, latitude } = landfillData;

    if (!LandfillID.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        LandfillID: "LandfillID can't be empty",
      }));
      isValid = false;
    }

    // Similarly, add validation for other fields

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data to be sent to the backend
    const requestData = {
      LandfillID: landfillData.LandfillID,
      capacity: landfillData.capacity,
      operationalTimespan: landfillData.operationalTimespan,
      address: landfillData.address,
      longitude: landfillData.longitude,
      latitude: landfillData.latitude,
    };

    // Perform POST request to insert data into the database
    axios.post('http://localhost:8000/landfills', requestData)
      .then(response => {
        console.log('Data inserted successfully:', response.data);
        // Reset form after successful submission
        history('/admin/all_landfills');
        window.location.reload();
        setLandfillData({
          LandfillID: '',
          capacity: '',
          operationalTimespan: '',
          longitude: '',
          latitude: '',
          address: '', // Reset address field
        });
      })
      .catch(error => {
        console.error('Error inserting data:', error);
        // Handle error, display error message, etc.
      });
  };

  const handleLatLngChange = (lat, lng, add) => {
    setLandfillData({
      ...landfillData,
      latitude: lat,
      longitude: lng,
      address: add,
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="mt-10 text-3xl font-semibold text-center text-purple-700 pb-5">
          Create Landfill
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LandfillID">
              Landfill ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.LandfillID ? "border-red-500" : ""}`}
              id="LandfillID"
              type="text"
              name="LandfillID"
              value={landfillData.LandfillID}
              onChange={handleInputChange}
              placeholder="Landfill ID"
            />
            {errors.LandfillID && (
              <p className="text-red-500 text-xs italic">{errors.LandfillID}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
              Capacity
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.capacity ? "border-red-500" : ""}`}
              id="capacity"
              type="text"
              name="capacity"
              value={landfillData.capacity}
              onChange={handleInputChange}
              placeholder="Capacity"
            />
            {errors.capacity && (
              <p className="text-red-500 text-xs italic">{errors.capacity}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="operationalTimespan">
              Operational Timespan
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.operationalTimespan ? "border-red-500" : ""}`}
              id="operationalTimespan"
              type="text"
              name="operationalTimespan"
              value={landfillData.operationalTimespan}
              onChange={handleInputChange}
              placeholder="Operational Timespan"
            />
            {errors.operationalTimespan && (
              <p className="text-red-500 text-xs italic">{errors.operationalTimespan}</p>
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
              Create Landfill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
