import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import VenueCard from '../../components/cards/venueCard';
import ServiceTypeCard from '../../components/cards/ServiceTypeCard';
import BGIMG from '../../assets/images/bg4.jpg'
import Img2 from '../../assets/web-images/111.png';
import Img4 from '../../assets/web-images/ven-img.png';

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [services, setServices] = useState([]);
  const [showSplash, setShowSplash] = useState(true); // Show splash screen initially
  const navigate = useNavigate();

  useEffect(() => {
    // Hide splash screen after 5 seconds
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(splashTimeout);
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch('/api/getAllVenue', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.status === 200) {
          const data = await res.json();
          const acceptedVenues = data.filter(venue => venue.status === "accepted");
          setVenues(acceptedVenues.slice(0, 5));
        } else {
          console.error('Failed to fetch venues');
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const res = await fetch('/api/getAllService', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.status === 200) {
          const data = await res.json();
          const acceptedServices = data.filter(service => service.status === "accepted");
          setServices(acceptedServices);
        } else {
          console.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchVenues();
    fetchServices();
  }, []);

  const otherServices = services.filter(service => service.serviceType === "others").slice(0, 5);

  // If splash screen is active, return a different UI
  if (showSplash) {
    return (
      <div className="splash-screen" style={{
              backgroundImage: `url(${BGIMG})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}>
        <div>
        <h2 className='L1'>Welcome to </h2>
        <h1 className='L2'>Wed Me Good</h1>
        <p className='L3'>Simple Solutions For Special Days</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='home-top-img-div'>
        <img src={Img2} className='home-top-img-image' alt="Top Image" />
      </div>

      <div className='home-C-venue'>
        <div className='home-C-venue-top'>
          <div className='home-C-venue-top-text'>
            <div className='top-venue-text-1'>Top Venues</div>
            <div className='top-venue-text-2'>Near You </div>
          </div>
          <div className='home-C-venue-top-img'>
            <img src={Img4} className='home-C-venue-top-image-image' alt="Venues" />
          </div>
        </div>
        <div className='home-C-venue-bottom'>
          {venues.length > 0 ? (
            venues.map((venue) => (
              <div key={venue._id} onClick={() => navigate(`/venuePage/${venue._id}`)}>
                <VenueCard
                  name={venue.name}
                  price={venue.basePrice}
                  venueType={venue.venueType}
                  image={venue.images[0]}
                />
              </div>
            ))
          ) : (
            <p>No venues found</p>
          )}
        </div>
        <button className='home-C-venue-bottom-button' onClick={() => { navigate('/venueClient') }}> View All .. </button>
      </div>

      {/* Services Section */}
      <div className='home-services-section'>
        <h1 className='h1-service'> Other Services</h1>
        <div className='home-services-row'>
          {otherServices.length > 0 ? (
            otherServices.map((service) => (
              <div key={service._id} onClick={() => navigate(`/servicePage/${service._id}`)}>
                <ServiceTypeCard
                  name={service.name}
                  vendorName={service.vendorName}
                  image={service.images[0]}
                />
              </div>
            ))
          ) : (
            <p>No decoration services found</p>
          )}
        </div>
        <button className='home-C-venue-bottom-button' onClick={() => { navigate('/ServiceClient') }}> View All .. </button>
      </div>
    </div>
  );
};

export default Home;
