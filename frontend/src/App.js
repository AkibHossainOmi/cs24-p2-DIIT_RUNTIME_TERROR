import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';

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
import AdminControlPanel from './Components/AdminControlPanel';
import UserManagement from './Components/UserManagement';
import AllUsers from './Components/AllUsers';
import VehicleManagement from './Components/VehicleManagement';
import AllVehicles from './Components/AllVehicles';
import Dashboard from './Components/Dashboard';




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
          <Route path="/admin/create_user" element={<CreateUserForm />} />
          <Route path="/admin/create_sts" element={<CreateStationForm />} />
          <Route path="/admin/create_vehicle" element={<AddVehiclePage />} />
          <Route path="/admin/sts/vehicle_entries" element={<AddVehicleEntryPage />} />
          <Route path="/landfill/AddDumpingEntryPage" element={<AddDumpingEntryPage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/change_password" element={<ChangePassword />} />
          <Route path="/user/edit_profile" element={<EditProfile />} />
          <Route path="/admin/control_panel" element={<AdminControlPanel />} />
          <Route path="/admin/user_management" element={<UserManagement />} />
          <Route path="/admin/all_users" element={<AllUsers />} />
          <Route path="/admin/vehicle_management" element={<VehicleManagement />} />
          <Route path="/admin/all_vehicles" element={<AllVehicles />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          
          


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
