import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Dashboard from './Components/Dashboard';
import { getLoggedInStatus, setLoggedIn } from './Components/Status';
import ForgotPassword from './ForgotPassword';
import Home from './Components/Home';
import CreateUserForm from './Components/CreateUserForm';
import CreateStationForm from './Components/CreateStationForm';
import AddVehiclePage from './Components/AddVehicleForm';
import AddVehicleEntryPage from './Components/AddVehicleEntryPage';
import AddDumpingEntryPage from './Components/AddDumpingEntryPage';
import Profile from './Components/UserProfilePage';
import ChangePassword from './Components/ChangePassword';
import EditProfile from './Components/EditProfile';
import About from './Components/About';
import Navbar from './Components/Navbar';



function App() {
  const isAuthenticated = getLoggedInStatus();
  console.log(isAuthenticated);
  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
          {isAuthenticated === 0 && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<Navigate to="/navbar" />} />
          </>
        )}
          {isAuthenticated > 0 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="*" element={<Navigate to="/navbar" />} />
          </>
        )}
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
