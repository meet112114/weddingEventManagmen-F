import React, { useEffect, useState } from "react";
import './vendorHome.css'
import BGIMG from '../../assets/web-images/bg2.jpg'
import { useNavigate } from 'react-router-dom';

const VendorHome = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [venues , setvenues] = useState('')
  const [services , setServices] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/get/vendor/profile", {
          method: "GET",
          credentials: "include", // Important for sending cookies
        });

        if (res.status === 200) {
          const data = await res.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }; 

    fetchProfile();
  }, []);

  useEffect(()=>{
    const fetchVenues = async() => {
      try{
        const res = await fetch('/api/get/vendors/venues',{
          method:"GET",
          credentials:"include"
        })
        const data = await res.json();
        setvenues(data)
      }catch(error){

      }
    }

    fetchVenues();
  },[])

  useEffect(()=>{
    const fetchServices = async() => {
      try{
        const res = await fetch('/api/get/vendors/services',{
          method:"GET",
          credentials:"include"
        })
        const data = await res.json();
        setServices(data)
      }catch(error){

      }
    }

    fetchServices();
  },[])
  console.log(services)


  if (!profile) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

  const handleVenueClick = (id) => {
    navigate(`/edit/venue/${id}`);
};

 const handleServiceClick = (id) => {
  navigate(`/edit/service/${id}`)
 }
  return (
    <div className="VH-main-div" style={{
      backgroundColor:"gray",
      height:"100%"
    }}>
      <div className="VH-div-1">

        <div className="VH-div-1-banner">
            <h2>Welcome {profile.name} nice to meet you </h2>
        </div>

        <div className="VH-div-1-main">

        <div className="VH-div-1-venue">
          <h3>Venues</h3>
          {profile.venues && profile.venues.length > 0 ? (
            <>
              <h6>Total Venues: {profile.venues.length}</h6>
              <button className="VH-div-1-venue-btn" onClick={() => navigate('/addVenue')}>
                Add Venues
              </button>
            </>
          ) : (
            <p>No venues added yet.</p>
          )}
        </div>

        <div className="VH-div-1-service">
          <h3>Services</h3>
          {profile.services && profile.services.length > 0 ? (
            <>
              <h6>Total Services: {profile.services.length}</h6>
              <button className="VH-div-1-service-btn" onClick={() => navigate('/addService')}>
                Add Services
              </button>
            </>
          ) : (
            <p>No services added yet.</p>
          )}
        </div>
        </div>

          <div className="VH-div-2">
            <div className="VH-div-2-l">
            <h5>Venues</h5>

                        {venues.length > 0 ? (
                venues.map((venue) => (
                    <div key={venue._id} onClick={() => handleVenueClick(venue._id)} style={{ cursor: 'pointer' }}>
                        {venue.name}
                    </div>
                ))
            ) : (
                <p>No venues found</p>
            )}


            </div>
            <div className="VH-div-2-r">
              <h5>Services</h5>
            {services.length > 0 ? (
            services.map((service) => (
             <div key={service._id} onClick={() => handleServiceClick(service._id)} style={{ cursor: 'pointer' }}>
              {service.name}
             </div>
            ))
          ) : (
            <p>No service found</p>
          )}
            </div>
          </div>

      </div>

    </div>
  );
};

export default VendorHome;