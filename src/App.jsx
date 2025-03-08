import React, { createContext, useEffect, useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate   } from 'react-router-dom';

import Login from './pages/login/login';
import Googlelogin from './pages/googleLogin/googleLogin';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Navbar from './components/navbar/navbar';
import Logout from './pages/logout/logout';
import VendorAbout from './pages/vendorAbout/vendorAbout';
import VendorRegister from './pages/vendorRegister/vendorRegister';
import VendorLogin from './pages/vendorLogin/vendorLogin';
import VendorHome from './pages/vendorHome/vendorHome';
import VenuesC from './pages/venuesC/venuesC';
import AddVenue from './pages/addVenue/addVenue';
import ServiceForm from './pages/addService/addService';
import EditVenue from './pages/manageVenue/editVenue';
import EditService from './pages/manageServices/editService';
import VenueDetails from './pages/viewVenueVendor/vvv';
import ServiceDetails from './pages/viewServiceVendor/vsv';
import VenuePage from './pages/venuePage/venuePage';
import ServicePage from './pages/servicePage/servicePage';
import ServicesC from './pages/servicesC/servicesC';
import OutfitMain from './pages/outfit-main/outfitMain';
import Outfit from './pages/outfit-single/outfit';
import UserBookings from './pages/bookings/bookings';
import AdminPanel from './pages/adminPanel/adminPage/adminPage';
import AdminVenue from './pages/adminPanel/adminVenues/adminvenue';
import AdminService from './pages/adminPanel/adminServices/adminServices';
import AdminBooking from './pages/adminPanel/adminBooking/adminbooking';
import AdminLogin from './pages/adminPanel/adminLogin/adminLogin';
import ServicesCat from './pages/serviceCat/serviceCat';
import VenuesCat from './pages/venuesCat/venueCat';
import SearchPage from './pages/searchPage/searchPage';

import { initialState, reducer } from "./reducer/UserReducer";
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer , initialState );

  return (
    <UserContext.Provider value={{state , dispatch}}>
    <Router>
      <Navbar/>
    <Routes>
      
      <Route exact path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/google' element={<Googlelogin/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/vendorAbout' element={<VendorAbout/>}/> 
      <Route path='/VendorRegister' element={<VendorRegister/>}/> 
      <Route path='/VendorLogin' element={<VendorLogin/>}/> 
      <Route path='/vendorHome' element={<VendorHome/>}/> 
      <Route path='/venueClient' element={<VenuesC/>}/> 
      <Route path='/servicesClient' element={<ServicesC/>}/> 
      <Route path='/addVenue' element={<AddVenue/>}/> 
      <Route path='/addService' element={<ServiceForm/>}/> 
      <Route path='/edit/venue/:id' element={<EditVenue/>}/>
      <Route path='/edit/service/:id' element={<EditService/>}/>
      <Route path='/vendor/venueDetail/:venueId' element={<VenueDetails/>}/>
      <Route path='/vendor/serviceDetail/:serviceId' element={<ServiceDetails/>}/>
      <Route path='/venuePage/:id' element={<VenuePage/>}/>
      <Route path='/ServiceClient' element={<ServicesC/>}/>
      <Route path='/servicePage/:serviceId' element={<ServicePage/>}/>
      <Route path='/outfits' element={<OutfitMain/>}/>
      <Route path='/outfit/:id' element={<Outfit/>}/>
      <Route path='/bookings' element={<UserBookings/>}/>
      <Route path='/admin' element={<AdminPanel/>}/>
      <Route path='/adminVenue' element={<AdminVenue/>}/>
      <Route path='/adminService' element={<AdminService/>}/>
      <Route path='/adminBooking' element={<AdminBooking/>}/>
      <Route path='/adminLogin' element={<AdminLogin/>}/>
      <Route path='/ServicesCat/:serviceType?' element={<ServicesCat/>}/>
      <Route path='/VenuesCat/:venueType?' element={<VenuesCat/>}/>
      <Route path='/SearchPage' element={<SearchPage/>}/>
    </Routes>
  </Router>
  </UserContext.Provider>
  )
}

export default App


