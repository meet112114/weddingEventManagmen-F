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
import ServicesC from './pages/servicesC/servicesC';
import AddVenue from './pages/addVenue/addVenue';
import ServiceForm from './pages/addService/addService';
import EditVenue from './pages/manageVenue/editVenue';
import EditService from './pages/manageServices/editService';

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
    </Routes>
  </Router>
  </UserContext.Provider>
  )
}

export default App


