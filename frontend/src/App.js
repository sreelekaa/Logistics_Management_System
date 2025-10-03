import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/User/home';
import Login from './Pages/Athentication/login'
import Register from './Pages/Athentication/register';
import Services from './Pages/User/services';
import Tracking from './Pages/User/tracking';
import Contact from './Pages/User/contact';
import Shipments from './Pages/User/shipments';
import ConfirmationPage from './Pages/User/confirmation';
import Inventory from './Pages/User/inventory';
import Terms from './Components/terms';
import AccountPage from './Pages/User/account';
import AdminLogin from './Pages/Athentication/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import TransportServices from './Pages/Admin/TransportServices';
import AdminAccount from './Pages/Admin/AdminAccount';
// import MainDash from './Pages/Admin/dashboard/components/MainDash/MainDash';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/TransportServices" element={<TransportServices/>} />
          <Route path="/accounts" element={<AdminAccount/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
