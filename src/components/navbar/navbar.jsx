import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./navbar.css";
import BgIMG from '../../assets/web-images/search2.png';
import Logo from '../../assets/ss 1/1.png'

const cityOptions = ["mumbai", "pune", "nashik", "nagpur", "indore"];

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const { user, vendor, admin, location } = state;
    const navigate = useNavigate(); // For redirecting

    const [showDropdown, setShowDropdown] = useState(false);
    const [showVenuesDropdown, setShowVenuesDropdown] = useState(false);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const [showOutfitdropdown , setShowOutfitdropdown] = useState(false);

    let dropdownTimeout, outfitDropdownTimeout, venuesDropdownTimeout, servicesDropdownTimeout;

    // Handle dropdowns for Venues
    const handleVenuesMouseEnter = () => {
        clearTimeout(venuesDropdownTimeout);
        setShowVenuesDropdown(true);
        setShowServicesDropdown(false);
        setShowDropdown(false);
        setShowOutfitdropdown(false);
    };

    const handleVenuesMouseLeave = () => {
        venuesDropdownTimeout = setTimeout(() => {
            setShowVenuesDropdown(false);
        }, 300);
    };

    // Handle dropdowns for Services
    const handleServicesMouseEnter = () => {
        clearTimeout(servicesDropdownTimeout);
        setShowServicesDropdown(true);
        setShowVenuesDropdown(false);
        setShowDropdown(false);
        setShowOutfitdropdown(false);
    };

    const handleServicesMouseLeave = () => {
        servicesDropdownTimeout = setTimeout(() => {
            setShowServicesDropdown(false);
        }, 300);
    };

    // Handle City Dropdown
    const handleMouseEnterOutfit = () => {
        clearTimeout(outfitDropdownTimeout);
        setShowOutfitdropdown(true);
        setShowVenuesDropdown(false);
        setShowServicesDropdown(false);
        setShowDropdown(false);
    };

    const handleMouseLeaveOutfit = () => {
        outfitDropdownTimeout = setTimeout(() => {
            setShowOutfitdropdown(false);
        }, 200);
    };

  

    // Handle Login Dropdown
    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeout);
        setShowDropdown(true);
        setShowVenuesDropdown(false);
        setShowServicesDropdown(false);
        setShowOutfitdropdown(false);
    };

    const handleMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setShowDropdown(false);
        }, 300);
    };

  
    

    // Handle Admin Login Redirect
    const handleAdminLogin = () => {
        navigate('/adminLogin');
    };

    const handleVenueClick = (venueId) => {
        navigate(`/VenuesCat/${venueId}`);
    };

    const handleServiceClick = (serviceID) => {
        navigate(`/ServicesCat/${serviceID}`)
    }

    const handleOutfitClick = (outfitId) => {
        navigate(`/outfit/${outfitId}`)
    }
    const RenderMenu = () => {
        if (user) {
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                    <li className="nav-item dropdown-container" onMouseEnter={handleVenuesMouseEnter} onMouseLeave={handleVenuesMouseLeave}>
    <NavLink className="nav-link" to="/venueClient">Venues</NavLink>
    {showVenuesDropdown && (
        <div className="custom-dropdown">
         <p className="venue-nav-headings">By Type</p>
                        <a className="dropdown-item" onClick={() => handleVenueClick("ac")}>Venues With Ac</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("pool")}>Venues With Pool</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("lawn")}>Venues With Lawn</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("outdoor")}>Outdoor Venues</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("mandap")}>Mandap Weddings</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("resort")}>Wedding Resort</a>
    </div>
    )}
</li>
<li className="nav-item dropdown-container" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                        <NavLink className="nav-link" to="/serviceClient">Services</NavLink>
                        {showServicesDropdown && (
                            <div className="custom-dropdown-venue">
                                <div className="custom-dropdown-venue-left">
                                    <p className="service-nav-headings">Wears</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("bridalwear")}>Bridalwear</a>
                        <a className="dropdown-item" onClick={() => handleServiceClick("groomwear")}>Groomwear</a>
                        <p className="service-nav-headings-2">Pandit</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("pandit")}>Wedding Pandits</a>
                   
                                </div>
                                <div className="custom-dropdown-venue-right">
                                <p className="service-nav-headings">Bride Essentials</p>
                                <a className="dropdown-item" onClick={() => handleServiceClick("jewellery")}> Wedding Jewellery</a>
                                <a className="dropdown-item" onClick={() => handleServiceClick("makeup")}>Makeup</a>
                                <p className="service-nav-headings-2">Photography</p>
                                <a className="dropdown-item" onClick={() => handleServiceClick("photography")}>Wedding Photography</a>
                                </div>
                                <div className="custom-dropdown-venue-right">
                                <p className="service-nav-headings">Others Services</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("decoration")}>Wedding Decoration</a>
                        <a className="dropdown-item" onClick={() => handleServiceClick("food")}>Food</a>
                        <p className="service-nav-headings-2">Mehndi</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("mehndi")}> Designer Mehndi </a>

                                </div>
                           
                            </div>
                        )}
                    </li>
                    <li className="nav-item dropdown-container" onMouseEnter={handleMouseEnterOutfit} onMouseLeave={handleMouseLeaveOutfit}><NavLink className="nav-link" to="/outfits">By Culture</NavLink>
                        {showOutfitdropdown && (
                            <div className="custom-dropdown">
                                <p className="venue-nav-headings">Outfits </p>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("1")}> Maharashtrian </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("2")}> Punjabi </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("3")}> Gujrati </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("4")}> Kashmiri </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("5")}> South-Indian </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("6")}> Bengali </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("7")}> Muslim </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("8")}> Buddhist </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("9")}> Christian </a>
                            </div>
                        )}
                    </li>

                    <li className="nav-item"><NavLink className="nav-link" to="/bookings">Booking</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/logout">Logout</NavLink></li>
                    <li className="nav-item-search"><NavLink className="nav-link" to="/searchPage"><img className="search-img" src={BgIMG}></img></NavLink></li>
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
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" to="/adminVenue">Venues</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/adminService">Services</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/adminBooking">Bookings</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/admin">Users</NavLink></li>
                </>
            );
        } else {
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>

                    <li className="nav-item dropdown-container" onMouseEnter={handleVenuesMouseEnter} onMouseLeave={handleVenuesMouseLeave}>
    <NavLink className="nav-link" to="/venueClient">Venues</NavLink>
    {showVenuesDropdown && (
        <div className="custom-dropdown">
         <p className="venue-nav-headings">By Type</p>
                        <a className="dropdown-item" onClick={() => handleVenueClick("ac")}>Venues With Ac</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("pool")}>Venues With Pool</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("lawn")}>Venues With Lawn</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("outdoor")}>Outdoor Venues</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("mandap")}>Mandap Weddings</a>
                        <a className="dropdown-item" onClick={() => handleVenueClick("resort")}>Wedding Resort</a>
    </div>
    )}
</li>

                    <li className="nav-item dropdown-container" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                    <NavLink className="nav-link" to="/serviceClient">Services</NavLink>
                        {showServicesDropdown && (
                            <div className="custom-dropdown-venue">
                                <div className="custom-dropdown-venue-left">
                                    <p className="service-nav-headings">Wears</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("bridalwear")}>Bridalwear</a>
                        <a className="dropdown-item" onClick={() => handleServiceClick("groomwear")}>Groomwear</a>
                        <p className="service-nav-headings-2">Pandit</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("pandit")}>Wedding Pandits</a>
                   
                                </div>
                                <div className="custom-dropdown-venue-right">
                                <p className="service-nav-headings">Bride Essentials</p>
                                <a className="dropdown-item" onClick={() => handleServiceClick("jewellery")}> Wedding Jewellery</a>
                                <a className="dropdown-item" onClick={() => handleServiceClick("makeup")}>Makeup</a>
                                <p className="service-nav-headings-2">Photography</p>
                                <a className="dropdown-item" onClick={() => handleServiceClick("photography")}>Wedding Photography</a>
                                </div>
                                <div className="custom-dropdown-venue-right">
                                <p className="service-nav-headings">Others Services</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("decoration")}>Wedding Decoration</a>
                        <a className="dropdown-item" onClick={() => handleServiceClick("food")}>Food</a>
                        <p className="service-nav-headings-2">Mehndi</p>
                        <a className="dropdown-item" onClick={() => handleServiceClick("mehndi")}> Designer Mehndi </a>

                                </div>
                           
                            </div>
                        )}
                    </li>

                    <li className="nav-item dropdown-container" onMouseEnter={handleMouseEnterOutfit} onMouseLeave={handleMouseLeaveOutfit}><NavLink className="nav-link" to="/outfits">By Culture</NavLink>
                        {showOutfitdropdown && (
                            <div className="custom-dropdown">
                                <p className="venue-nav-headings">Outfits </p>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("1")}> Maharashtrian </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("2")}> Punjabi </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("3")}> Gujrati </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("4")}> Kashmiri </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("5")}> South-Indian </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("6")}> Bengali </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("7")}> Muslim </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("8")}> Buddhist </a>
                                <a className="dropdown-item" onClick={() => handleOutfitClick("9")}> Christian </a>
                            </div>
                        )}
                    </li>

                    <li className="nav-item dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <a className="nav-link">Login / Register</a>
                        {showDropdown && (
                            <div className="custom-dropdown">
                                <p className="venue-nav-headings">For User </p>
                                <NavLink className="dropdown-item" to="/login">User Login</NavLink>
                                <NavLink className="dropdown-item" to="/register">User Register</NavLink>
                                <hr />
                                <p className="venue-nav-headings">For Vendor</p>
                                <NavLink className="dropdown-item" to="/vendorLogin">Vendor Login</NavLink>
                                <NavLink className="dropdown-item" to="/vendorRegister">Vendor Register</NavLink>
                            </div>
                        )}
                    </li>
                    <li className="nav-item-search"><NavLink className="nav-link" to="/searchPage"><img className="search-img" src={BgIMG}></img></NavLink></li>

                    {/* <li className="nav-item city-dropdown-container" onMouseEnter={handleCityMouseEnter} onMouseLeave={handleCityMouseLeave}>
                        <a className="nav-link">City : {location || "Select City"}</a>
                        {showCityDropdown && (
                            <div className="city-dropdown">
                                {cityOptions.map((city, index) => (
                                    <a key={index} className="dropdown-item" onClick={() => handleCityChange(city)}>
                                        {city}
                                    </a>
                                ))}
                            </div>
                        )}
                    </li> */}
                </>
            );
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbarclass">
            <div className="container-fluid">
                <img className="nav-logo" src={Logo}></img>
                <a className="navbar-brand" style={{ fontFamily: "monospace", cursor: "pointer" }} onClick={handleAdminLogin}>
                    Wed<strong>me</strong>Good
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto">
                        <RenderMenu />
                        
                    </ul>
                   
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
