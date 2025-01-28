import React, { useEffect, useState } from "react";
import './vendorHome.css'
import BGIMG from '../../assets/web-images/bg2.jpg'

const VendorHome = () => {
  const [profile, setProfile] = useState(null);

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
          console.log(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

  return (
    <div className="VH-main-div" style={{  
    backgroundImage: `url(${BGIMG})`,
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat", 
    height:'90h',
    margin: 0, 
    padding: 0,
    }}>
      <div className="VH-div-1">

        <div className="VH-div-1-banner">
            <h2>Welcome {profile.name} nice to meet you </h2>
        </div>

        <div className="VH-div-1-venue">
          <h3>Venues</h3>
          {profile.venues && profile.venues.length > 0 ? (
            <>
              <h6>Total Venues: {profile.venues.length}</h6>
              <button className="VH-div-1-venue-btn" onClick={() => console.log("Navigate to Manage Venues")}>
                Manage Venues
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
              <button className="VH-div-1-service-btn" onClick={() => console.log("Navigate to Manage Services")}>
                Manage Services
              </button>
            </>
          ) : (
            <p>No services added yet.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default VendorHome;