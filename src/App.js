import './App.css';
import logo from "../src/images/logo.jpg";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import AddCars from "./pages/AddCars.js";
import Bookings from "./pages/Bookings.js";
import Cars from "./pages/Cars.js";
import { NavLink } from 'react-router-dom';


function App() {
  return (
    <>




      <nav className=" sticky nav-bar">
        <img className="logo" src={logo} alt="RideHub Logo" />
        <h1 style={{ borderRadius: "10px", padding: "10px", backgroundColor: "wheat", color: "green" }}>Admin View</h1>
        <h2>RideHub Cabs</h2>

      </nav>
      <div className="sidebar">
        <ul>
          <NavLink className="nav-link" to="/"><li>Dashboard</li></NavLink>
          <NavLink className="nav-link" to="/add"><li>Add Cars</li></NavLink>
          <NavLink className="nav-link" to="/bookings"><li>Bookings</li></NavLink>
          <NavLink className="nav-link" to="/cars"><li>Cars Details</li></NavLink>

        </ul>
      </div >
      <div className="admin-panel">


        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddCars />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
