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

  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/stations" element={<StationList />} />
          <Route path="/create_user" element={<CreateUserForm />} />
          <Route path="/create_sts" element={<CreateStationForm />} />
          <Route path="/add_vehicle" element={<AddVehiclePage />} />
          <Route path="/sts/vehicle_entries" element={<AddVehicleEntryPage />} />
          <Route path="/landfill/AddDumpingEntryPage" element={<AddDumpingEntryPage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/change_password" element={<ChangePassword />} />
          <Route path="/user/edit_profile" element={<EditProfile />} />
          
          


          {isAuthenticated ? (
            <>
              
              <Route path="/profile" element={<Profile />} />
              
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/registration" element={<Registration />} />
            </>
          )}
          <Route path="*" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
