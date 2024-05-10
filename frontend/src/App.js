import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Dashboard from './Components/Dashboard';
import { getLoggedInStatus } from './Components/Status';
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
import AllUsers from './Components/AllUsers';
import UserProfile from './Components/UserProfilePage';
import AdminControlPanel from './Components/AdminControlPanel';
import UserManagement from './Components/UserManagement';
import Profile from './Components/Profile';
import AdminEdit from './Components/AdminEdit';
import VehicleManagement from './Components/VehicleManagement';
import AllVehicles from './Components/AllVehicles';
import AssignTrucks from './Components/AssignTrucks';
import STSManagement from './Components/StsManagement';
import AllSTS from './Components/AllSts';
import LandfillManagement from './Components/LandfillManagement';
import CreateLandfillForm from './Components/CreateLandfill';
import AllLandfills from './Components/AllLandfill';
import CreateRole from './Components/CreateRole';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import BillingView from './Components/Billingview';
import CreateContractorForm from './Components/CreateContractorForm';
import ContractorManagement from './Components/ContractorManagement';
import AllContractors from './Components/AllContractors';
import CreateContractorManager from './Components/CreateContractorManager';
import AllContractorManagers from './Components/AllContractorManagers';
import LoggedWorkingHours from './Components/LoggedWorkingHours';
import EnterWorkingHours from './Components/EnterWorkingHours';
import WorkforceRegistrationPage from './Components/WorkforceRegistrationPage';
import AllEmployees from './Components/AllEmployees';
import WastageEntries from './Components/WastageEntries';



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
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/n" element={<LoggedWorkingHours />} />
        

          {isAuthenticated === 0 && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/navbar" />} />
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
            <Route path="*" element={<Navigate to="/navbar" />} />
            <Route path="/admin/contractor_management" element={<ContractorManagement />} />
            <Route path="/admin/create_contractor" element={<CreateContractorForm />} />
            <Route path="/admin/all_contractors" element={<AllContractors />} />
            <Route path="/admin/create_contractor_manager" element={<CreateContractorManager />} />
            <Route path="/admin/all_contractor_managers" element={<AllContractorManagers />} />




          </>
        )}
        {isAuthenticated === 2 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:userId" element={<EditProfile />} />
            <Route path="/vehicle_entries" element={<AddVehicleEntryPage />} />
            <Route path="/user/change_password" element={<ChangePassword />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/navbar" />} />

            <Route path="/wastage_entries" element={<WastageEntries />} />

          </>
        )}
        {isAuthenticated === 3 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:userId" element={<EditProfile />} />
            <Route path="/vehicle_entries" element={<AddDumpingEntryPage />} />
            <Route path="/user/change_password" element={<ChangePassword />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/billing" element={<BillingView />} />
            <Route path="*" element={<Navigate to="/navbar" />} />
          </>
        )}
        {isAuthenticated === 5 && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:userId" element={<EditProfile />} />          
            <Route path="/user/change_password" element={<ChangePassword />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/navbar" />} />

            <Route path="/create_employee" element={<WorkforceRegistrationPage />} />
            <Route path="/all_employee" element={<AllEmployees />} />

            <Route path="/employees/:employeeId" element={<EnterWorkingHours />} />

            <Route path="/monitoring_employee" element={<LoggedWorkingHours />} />

            
          </>
        )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
