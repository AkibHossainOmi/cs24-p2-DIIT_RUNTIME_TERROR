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
import ChangePassword from './Components/ChangePassword';
import EditProfile from './Components/EditProfile';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Users from './Components/Users';
import AllUsers from './Components/AllUsers';
import UserProfile from './Components/UserProfilePage';
import AdminControlPanel from './Components/AdminControlPanel';
import UserManagement from './Components/UserManagement';
import Profile from './Components/Profile';
import AdminEdit from './Components/AdminEdit';
import VehicleManagement from './Components/VehicleManagement';
import AllVehicles from './Components/AllVehicles';
import VehicleProfile from './Components/Vehicle';
import AssignTrucks from './Components/AssignTrucks';
import STSManagement from './Components/StsManagement';
import AllSTS from './Components/AllSts';
import LandfillManagement from './Components/LandfillManagement';
import CreateLandfillForm from './Components/CreateLandfill';
import AllLandfills from './Components/AllLandfill';
import CreateRole from './Components/CreateRole';



function App() {
  const isAuthenticated = parseInt(getLoggedInStatus());
  console.log(isAuthenticated);
  console.log(typeof isAuthenticated);
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
            {/* <Route path="*" element={<Navigate to="/navbar" />} /> */}
          </>
        )}
          {isAuthenticated === 1 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/edit/:userId" element={<EditProfile />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/control" element={<AdminControlPanel />} />
            <Route path="/admin/user_management" element={<UserManagement />} />
            <Route path="/admin/all_users" element={<AllUsers />} />
            <Route path="/admin_edit/:userId" element={<AdminEdit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/create_user" element={<CreateUserForm />} />
            <Route path="/admin/vehicle_management" element={<VehicleManagement />} />
            <Route path="/admin/create_vehicle" element={<AddVehiclePage />} />
            <Route path="/admin/all_vehicles" element={<AllVehicles />} /> 
            <Route path="/admin/create_sts" element={<CreateStationForm />} /> 
            <Route path="/vehicles/:VehicleRegistrationNumber" element={<AssignTrucks />} /> 
            <Route path="/admin/sts_management" element={<STSManagement />} /> 
            <Route path="/admin/all_sts" element={<AllSTS />} /> 
            <Route path="/admin/landfill_management" element={<LandfillManagement />} />
            <Route path="/admin/create_landfill" element={<CreateLandfillForm />} />
            <Route path="/admin/all_landfills" element={<AllLandfills />} />
            <Route path="/admin/create_roles" element={<CreateRole />} />
            <Route path="/user/change_password" element={<ChangePassword />} />
            {/* <Route path="*" element={<Navigate to="/navbar" />} /> */}
          </>
        )}
        {isAuthenticated === 2 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:userId" element={<EditProfile />} />
            <Route path="/sts_entries" element={<AddVehicleEntryPage />} />
            <Route path="/user/change_password" element={<ChangePassword />} />
            {/* <Route path="*" element={<Navigate to="/navbar" />} /> */}
          </>
        )}
        {isAuthenticated === 3 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:userId" element={<EditProfile />} />
            <Route path="/user/change_password" element={<ChangePassword />} />
            {/* <Route path="*" element={<Navigate to="/navbar" />} /> */}
          </>
        )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
