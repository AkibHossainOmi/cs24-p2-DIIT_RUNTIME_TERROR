// import React, { useState } from 'react';
// import Navbar from "./Navbar";
// import { useNavigate } from 'react-router-dom';

// export default function AddDumpingEntryPage() {
//   const history = useNavigate();
//   const [dumpingEntryData, setDumpingEntryData] = useState({
//     LandfillID: '',
//     VehicleRegistrationNumber: '',
//     WeightOfWaste: '',
//     TimeOfArrival: '',
//     TimeOfDeparture: '',
//   });

//   const [errors, setErrors] = useState({
//     LandfillID: '',
//     VehicleRegistrationNumber: '',
//     WeightOfWaste: '',
//     TimeOfArrival: '',
//     TimeOfDeparture: '',
//   });

//   const handleInputChange = (e) => {
//     setDumpingEntryData({
//       ...dumpingEntryData,
//       [e.target.name]: e.target.value,
//     });

//     setErrors({
//       ...errors,
//       [e.target.name]: '',
//     });
//   };

//   const validateForm = () => {
//     let isValid = true;

//     const { LandfillID, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture } = dumpingEntryData;

//     if (!LandfillID.trim()) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         LandfillID: "Landfill ID can't be empty",
//       }));
//       isValid = false;
//     }
//     // Add validation for other fields

//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/landfill-entries', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dumpingEntryData),
//       });

//       if (response.ok) {
//         console.log('Dumping entry submitted successfully');
//         history('/billing');
//         window.location.reload();
//         setDumpingEntryData({
//           LandfillID: '',
//           VehicleRegistrationNumber: '',
//           WeightOfWaste: '',
//           TimeOfArrival: '',
//           TimeOfDeparture: '',
//         });
//       } else {
//         console.error('Error submitting dumping entry');
//       }
//     } catch (error) {
//       console.error('An unexpected error occurred:', error);
//     }
//   };

//   return (
//     <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
//       <Navbar />
//       <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
//         <h1 className="text-3xl font-semibold text-center text-purple-700  mt-10">
//           Add Dumping Entry
//         </h1>
//         <form className="mt-5" onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LandfillID">
//               Landfill ID
//             </label>
//             <input
//               className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.LandfillID ? "border-red-500" : ""}`}
//               id="LandfillID"
//               type="text"
//               name="LandfillID"
//               value={dumpingEntryData.LandfillID}
//               onChange={handleInputChange}
//               placeholder="Landfill ID"
//             />
//             {errors.LandfillID && (
//               <p className="text-red-500 text-xs italic">{errors.LandfillID}</p>
//             )}
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="VehicleRegistrationNumber">
//               Vehicle Registration Number
//             </label>
//             <input
//               className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.VehicleRegistrationNumber ? "border-red-500" : ""}`}
//               id="VehicleRegistrationNumber"
//               type="text"
//               name="VehicleRegistrationNumber"
//               value={dumpingEntryData.VehicleRegistrationNumber}
//               onChange={handleInputChange}
//               placeholder="Vehicle Registration Number"
//             />
//             {errors.VehicleRegistrationNumber && (
//               <p className="text-red-500 text-xs italic">{errors.VehicleRegistrationNumber}</p>
//             )}
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="WeightOfWaste">
//               Weight of Waste
//             </label>
//             <input
//               className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.WeightOfWaste ? "border-red-500" : ""}`}
//               id="WeightOfWaste"
//               type="text"
//               name="WeightOfWaste"
//               value={dumpingEntryData.WeightOfWaste}
//               onChange={handleInputChange}
//               placeholder="Weight of Waste"
//             />
//             {errors.WeightOfWaste && (
//               <p className="text-red-500 text-xs italic">{errors.WeightOfWaste}</p>
//             )}
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TimeOfArrival">
//               Time of Arrival
//             </label>
//             <input
//               className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.TimeOfArrival ? "border-red-500" : ""}`}
//               id="TimeOfArrival"
//               type="datetime-local"
//               name="TimeOfArrival"
//               value={dumpingEntryData.TimeOfArrival}
//               onChange={handleInputChange}
//               placeholder="Time of Arrival"
//             />
//             {errors.TimeOfArrival && (
//               <p className="text-red-500 text-xs italic">{errors.TimeOfArrival}</p>
//             )}
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TimeOfDeparture">
//               Time of Departure
//             </label>
//             <input
//               className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.TimeOfDeparture ? "border-red-500" : ""}`}
//               id="TimeOfDeparture"
//               type="datetime-local"
//               name="TimeOfDeparture"
//               value={dumpingEntryData.TimeOfDeparture}
//               onChange={handleInputChange}
//               placeholder="Time of Departure"
//             />
//             {errors.TimeOfDeparture && (
//               <p className="text-red-500 text-xs italic">{errors.TimeOfDeparture}</p>
//             )}
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Add Dumping Entry
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import BillingView from './Billingview';

export default function AddDumpingEntryPage() {
  const history = useNavigate();
  const [dumpingEntryData, setDumpingEntryData] = useState({
    LandfillID: '',
    VehicleRegistrationNumber: '',
    WeightOfWaste: '',
    TimeOfArrival: '',
    TimeOfDeparture: '',
    wardNumber: '',
  });

  const [errors, setErrors] = useState({
    LandfillID: '',
    VehicleRegistrationNumber: '',
    WeightOfWaste: '',
    TimeOfArrival: '',
    TimeOfDeparture: '',
    wardNumber: '',
  });

  const [submitted, setSubmitted] = useState(false); // State to track if entry is submitted

  const handleInputChange = (e) => {
    setDumpingEntryData({
      ...dumpingEntryData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { LandfillID, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture } = dumpingEntryData;

    if (!LandfillID.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        LandfillID: "Landfill ID can't be empty",
      }));
      isValid = false;
    }
    // Add validation for other fields

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/landfill-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dumpingEntryData),
      });

      if (response.ok) {
        console.log('Dumping entry submitted successfully');
        try {
          const response2 = await fetch('http://localhost:8000/ward-number', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vehicleRegistrationNumber: dumpingEntryData.VehicleRegistrationNumber }), // Send vehicleRegistrationNumber in the request body
        }); 
        if (response.ok) {
          const data = await response2.json(); // Extract JSON data from the response
          dumpingEntryData.wardNumber = data.wardNumber; // Access the wardNumber from the response
          console.log('Ward Number:', dumpingEntryData.wardNumber);
        } else {
          console.error('Failed to fetch ward number');
        }
        } catch (error) {
          console.error('An unexpected error occurred:', error);
        }

        setSubmitted(true); // Set submitted state to true
        // Reset form after successful submission
        // history('/billing');
        // window.location.reload();
      } else {
        console.error('Error submitting dumping entry');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700  mt-10">
          Add Dumping Entry
        </h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LandfillID">
              Landfill ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.LandfillID ? "border-red-500" : ""}`}
              id="LandfillID"
              type="text"
              name="LandfillID"
              value={dumpingEntryData.LandfillID}
              onChange={handleInputChange}
              placeholder="Landfill ID"
            />
            {errors.LandfillID && (
              <p className="text-red-500 text-xs italic">{errors.LandfillID}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="VehicleRegistrationNumber">
              Vehicle Registration Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.VehicleRegistrationNumber ? "border-red-500" : ""}`}
              id="VehicleRegistrationNumber"
              type="text"
              name="VehicleRegistrationNumber"
              value={dumpingEntryData.VehicleRegistrationNumber}
              onChange={handleInputChange}
              placeholder="Vehicle Registration Number"
            />
            {errors.VehicleRegistrationNumber && (
              <p className="text-red-500 text-xs italic">{errors.VehicleRegistrationNumber}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="WeightOfWaste">
              Weight of Waste
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.WeightOfWaste ? "border-red-500" : ""}`}
              id="WeightOfWaste"
              type="text"
              name="WeightOfWaste"
              value={dumpingEntryData.WeightOfWaste}
              onChange={handleInputChange}
              placeholder="Weight of Waste"
            />
            {errors.WeightOfWaste && (
              <p className="text-red-500 text-xs italic">{errors.WeightOfWaste}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TimeOfArrival">
              Time of Arrival
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.TimeOfArrival ? "border-red-500" : ""}`}
              id="TimeOfArrival"
              type="datetime-local"
              name="TimeOfArrival"
              value={dumpingEntryData.TimeOfArrival}
              onChange={handleInputChange}
              placeholder="Time of Arrival"
            />
            {errors.TimeOfArrival && (
              <p className="text-red-500 text-xs italic">{errors.TimeOfArrival}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TimeOfDeparture">
              Time of Departure
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.TimeOfDeparture ? "border-red-500" : ""}`}
              id="TimeOfDeparture"
              type="datetime-local"
              name="TimeOfDeparture"
              value={dumpingEntryData.TimeOfDeparture}
              onChange={handleInputChange}
              placeholder="Time of Departure"
            />
            {errors.TimeOfDeparture && (
              <p className="text-red-500 text-xs italic">{errors.TimeOfDeparture}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Dumping Entry
            </button>
          </div>
        </form>
        {submitted && ( // Render billing view if entry is submitted
          <BillingView params={dumpingEntryData} />
        )}
      </div>
    </div>
  );
}
