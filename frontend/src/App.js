import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Dashboard from './Components/Dashboard';
import { getLoggedInStatus } from './Components/Status';
import ForgotPassword from './ForgotPassword';
import TrainList from './Components/TrainList';
import Home from './Components/Home';
import StationList from './Components/StationList';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import CreateUserForm from './Components/CreateUserForm';
import CreateStationForm from './Components/CreateStationForm';
import AddVehiclePage from './Components/AddVehicleForm';
import AddVehicleEntryPage from './Components/AddVehicleEntryPage';
import AddDumpingEntryPage from './Components/AddDumpingEntryPage';
import UserProfile from './Components/UserProfilePage';
import ChangePassword from './Components/ChangePassword';
import EditProfile from './Components/EditProfile';



function App() {
  const isAuthenticated = getLoggedInStatus();
  console.log(isAuthenticated);
  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Routes>

          {isAuthenticated === 0 && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        )}
          {isAuthenticated > 0 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </>
        )}
        
        <Route path="*" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
