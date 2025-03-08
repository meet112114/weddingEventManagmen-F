import React, { useEffect, useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import VenueCard from '../../components/cards/venueCard';
import ServiceTypeCard from '../../components/cards/ServiceTypeCard';
import BGIMG from '../../assets/images/bg4.jpg'
import Img2 from '../../assets/web-images/22.png';
import Img5 from '../../assets/web-images/cat1.png';
import Img4 from '../../assets/web-images/ven-img.png';
import CitySelector from "../../components/locationCard/locationCard";
import { UserContext } from '../../App'; 

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const { location } = state;
  const [venues, setVenues] = useState([]);
  const [services, setServices] = useState([]);
  const [showSplash, setShowSplash] = useState(true); // Show splash screen initially
  const navigate = useNavigate();

  useEffect(() => {
    // Hide splash screen after 5 seconds
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

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
                let acceptedVenues = data.filter(venue => venue.status === "accepted");

                // Filter by location if selected
                if (location) {
                    acceptedVenues = acceptedVenues.filter(venue => venue.location.toLowerCase() === location.toLowerCase());
                }

                setVenues(acceptedVenues.slice(0, 3)); // Show only first 5 venues
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
                let acceptedServices = data.filter(service => service.status === "accepted");

                // Filter services by location if selected
                if (location) {
                    acceptedServices = acceptedServices.filter(service => service.location.toLowerCase() === location.toLowerCase());
                }

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
}, [location]); // Re-fetch data when location changes

const handleNavigate = (path) => {
  navigate(path);
};

const handleVenueClick = (venueId) => {
  navigate(`/VenuesCat/${venueId}`);
};
const handleServiceClick = (serviceID) => {
  navigate(`/ServicesCat/${serviceID}`)
};

const handleOutfitClick = (outfitId) => {
  navigate(`/outfit/${outfitId}`)
};


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
      <CitySelector/>
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

          <h1 className='home-categories-sec-title'>Categories </h1>
      <div className='home-categories-sec'>
      <div className='home-categories-sec-left'>
        <img src={Img5} className='home-categories-sec-img' onClick={() => handleNavigate('/venueClient')} />
        <img src={Img2} className='home-categories-sec-img' onClick={() => handleNavigate('/ServicesCat/makeup')} />
        <img src={Img2} className='home-categories-sec-img'  onClick={() => handleNavigate('/ServicesCat/bridalwear')}/>
        <img src={Img2} className='home-categories-sec-img'  onClick={() => handleNavigate('/ServicesCat/groomwear')}/>
        <img src={Img2} className='home-categories-sec-img'  onClick={() => handleNavigate('/ServicesCat/jewellery')}/>
      </div>
      <div className='home-categories-sec-right'>
        <img src={Img2} className='home-categories-sec-img'  onClick={() => handleNavigate('/ServicesCat/photography')} />
        <img src={Img2} className='home-categories-sec-img'  onClick={() => handleNavigate('/ServicesCat/decoration')}/>
        <img src={Img2} className='home-categories-sec-img'  onClick={() => handleNavigate('/ServicesCat/mehndi')}/>
        <img src={Img2} className='home-categories-sec-img' onClick={() => handleNavigate('/ServicesCat/pandit')} />
        <img src={Img2} className='home-categories-sec-img'  onClick={() => handleNavigate('/ServicesCat/food')} />
      </div>
    </div>

      {/* Services Section */}
      <div className='home-services-section'>

          <div className='footer-sec-1'>
            <h3> Venues </h3>
            <div className='footer-sec-1-1'>
              <p className='footer-sec-1-1-heading'>Venue By Ameneties</p>
            <a className="dropdown-item1" onClick={() => handleVenueClick("ac")}>Venues With Ac</a>
            <a className="dropdown-item1" onClick={() => handleVenueClick("pool")}>Venues With Pool</a>
            <a className="dropdown-item1" onClick={() => handleVenueClick("lawn")}>Venues With Lawn</a>
            </div>
            <div className='footer-sec-1-2'>
            <p className='footer-sec-1-2-heading'>Venue by Types </p>
            <a className="dropdown-item1" onClick={() => handleVenueClick("outdoor")}>Outdoor Venues</a>
            <a className="dropdown-item1" onClick={() => handleVenueClick("mandap")}>Mandap Weddings</a>
            <a className="dropdown-item1" onClick={() => handleVenueClick("resort")}>Wedding Resort</a>
            </div>
            
                        
          </div>

          <div className='footer-sec-2'>
          <h3> services </h3>
          <div className='footer-sec-2-1'>
          <a className="dropdown-item1" onClick={() => handleServiceClick("bridalwear")}>Bridalwear</a>
          <a className="dropdown-item1" onClick={() => handleServiceClick("groomwear")}>Groomwear</a>
          <a className="dropdown-item1" onClick={() => handleServiceClick("pandit")}>Wedding Pandits</a>
          <a className="dropdown-item1" onClick={() => handleServiceClick("jewellery")}> Wedding Jewellery</a>
          <a className="dropdown-item1" onClick={() => handleServiceClick("makeup")}>Makeup</a>
          </div>
          <div className='footer-sec-2-2'>
          <a className="dropdown-item1" onClick={() => handleServiceClick("photography")}>Wedding Photography</a>
          <a className="dropdown-item1" onClick={() => handleServiceClick("decoration")}>Wedding Decoration</a>
          <a className="dropdown-item1" onClick={() => handleServiceClick("food")}>Food</a>
          <a className="dropdown-item1" onClick={() => handleServiceClick("mehndi")}> Designer Mehndi </a>
          </div>
         
         

          </div>

          <div className='footer-sec-2'>

          <h3> Outfits </h3>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("1")}> Maharashtrian </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("2")}> Punjabi </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("3")}> Gujrati </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("4")}> Kashmiri </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("5")}> South-Indian </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("6")}> Bengali </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("7")}> Muslim </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("8")}> Buddhist </a>
                                <a className="dropdown-item1" onClick={() => handleOutfitClick("9")}> Christian </a>

          </div >

      </div>
    </div>
  );
};

export default Home;
