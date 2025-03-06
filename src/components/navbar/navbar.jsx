import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./navbar.css";

const Navbar = () => {
    const { state  , dispatch} = useContext(UserContext);
    const { user, vendor , admin} = state;
    const navigate = useNavigate(); // For redirecting

    // Handle Admin Login Prompt
    const handleAdminLogin = () => {
        navigate('/adminLogin')
    };

    const RenderMenu = () => {
        if (user) {
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/venueClient">Venues</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/ServiceClient">Services</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/outfits">Outfits</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/bookings">Booking</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/logout">Logout</NavLink></li>
                </>
            );
        } else if (vendor) {
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" to="/vendorHome">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/addVenue">Add Venue</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/addService">Add Service</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/logout">Logout</NavLink></li>
                </>
            );
        } else if (admin) {
          return(
          <>
          <li className="nav-item"><NavLink className="nav-link" to="/adminVenue">Venue</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/adminService">services</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/adminBooking">Booking</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/admin">Users</NavLink></li>
          </>);
        }
        else{
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/venueClient">Venues</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/ServiceClient">Services</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/outfits">Outfits</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/vendorAbout">Vendor ?</NavLink></li>
                </>
            );
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbarclass">
                <div className="container-fluid">
                    {/* Clickable logo for Admin Login */}
                    <a className="navbar-brand" style={{ fontFamily: "monospace", cursor: "pointer" }} onClick={handleAdminLogin}>
                        Wed-Me-Good
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <RenderMenu />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
