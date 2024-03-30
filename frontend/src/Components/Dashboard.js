import React from 'react';
import Chart from 'react-apexcharts';
import Navbar from "./Navbar";

const Dashboard = () => {
  // Sample data for waste collection
  const wasteCollectionData = {
    options: {
      chart: {
        id: 'waste-collection-chart',
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
    },
    series: [
      {
        name: 'Waste Collection (tons)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  // Sample data for waste collection at each STS
  const wasteCollectionSTSData = {
    options: {
      chart: {
        id: 'waste-collection-sts-chart',
      },
      xaxis: {
        categories: ['STS 1', 'STS 2', 'STS 3', 'STS 4'], // Assuming STS IDs
      },
    },
    series: [
      {
        name: 'Waste Collection at Each STS (tons)',
        data: [50, 70, 65, 80], // Dummy values for waste collection at each STS
      },
    ],
  };

  // Sample data for waste collection at each Landfill site
  const wasteCollectionLandfillData = {
    options: {
      chart: {
        id: 'waste-collection-landfill-chart',
      },
      xaxis: {
        categories: ['Landfill 1', 'Landfill 2', 'Landfill 3', 'Landfill 4'], // Assuming Landfill site IDs
      },
    },
    series: [
      {
        name: 'Waste Collection at Each Landfill Site (tons)',
        data: [60, 50, 55, 70], // Dummy values for waste collection at each Landfill site
      },
    ],
  };

  // Sample data for daily fuel cost statistics for the trucks
  const dailyFuelCostData = {
    options: {
      chart: {
        id: 'daily-fuel-cost-chart',
      },
      xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], // Sample days
      },
    },
    series: [
      {
        name: 'Daily Fuel Cost for Trucks (BDT)',
        data: [100, 120, 90, 110, 130, 100, 115], // Dummy values for daily fuel cost
      },
    ],
  };

  // Sample data for real-time monitoring of transport activities
  const transportActivitiesData = {
    options: {
      chart: {
        id: 'transport-activities-chart',
      },
      xaxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Sample days
      },
    },
    series: [
      {
        name: 'Real-time Monitoring of Transport Activities (trips)',
        data: [20, 25, 30, 35, 40, 45, 50], // Dummy values for transport activities
      },
    ],
  };

  return (
    <div className="relative h-screen bg-purple-100">
      <div className="fixed top-20 inset-x-0 bg-white z-10 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
      <Navbar />
        <h2 className="text-3xl text-center font-bold mb-6 text-purple-700">Dashboard</h2>
       <div className='ml-8'>
       <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-700">Real-time Monitoring of Waste Collection</h3>
          <Chart options={wasteCollectionData.options} series={wasteCollectionData.series} type="bar" height={350} />
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-700">Real-time Monitoring of Transport Activities</h3>
          <Chart options={transportActivitiesData.options} series={transportActivitiesData.series} type="bar" height={350} />
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-700">Waste Collection at Each STS</h3>
          <Chart options={wasteCollectionSTSData.options} series={wasteCollectionSTSData.series} type="bar" height={350} />
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-700">Waste Collection at Each Landfill Site</h3>
          <Chart options={wasteCollectionLandfillData.options} series={wasteCollectionLandfillData.series} type="bar" height={350} />
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-700">Daily Fuel Cost for Trucks</h3>
          <Chart options={dailyFuelCostData.options} series={dailyFuelCostData.series} type="bar" height={350} />
        </div>
       </div>
      </div>
    </div>
  );
};

export default Dashboard;
