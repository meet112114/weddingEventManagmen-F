import React, { useEffect, useState } from 'react'
import './home.css'
import VenueCard from '../../components/cards/venueCard';
import Img from '../../assets/web-images/ind-wed-bg.jpg';
import Img2 from '../../assets/web-images/3.png';
import Img3 from '../../assets/web-images/ven-txt.png'
import Img4 from '../../assets/web-images/ven-img.png'
import ServiceTypeCard from '../../components/cards/serviceTypeCard';
import BGIMG from '../../assets/web-images/bg2.jpg'

const Home = () => {
  const [venues , setVenues] = useState('');

  
  useEffect(() => {
    const fetchvenues = async () => {
      try {
        const res = await fetch('/api/get/venue/pune', {
          method: 'GET',
          credentials: 'include', // Important for sending cookies
        });

        if (res.status === 200) {
          const data = await res.json();
          setVenues(data.slice(0, 5));
          console.log(data)

        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchvenues();
  }, []);


  return (
    <div>

      <div className='home-top-img-div'>
      <img src={Img2}  className='home-top-img-image'/> 
      </div>

      <div className='home-C-venue'>
          <div className='home-C-venue-top'>
              <div className='home-C-venue-top-text'>
                <img src={Img3} className='home-C-venue-top-text-image'/>
              </div>
              <div className='home-C-venue-top-img'>
                <img src={Img4} className='home-C-venue-top-image-image'/>
              </div>
          </div>
          <div className='home-C-venue-bottom'>
          {venues.length > 0 ? (
            venues.map((venue) => (
              <VenueCard
                key={venue._id}
                name={venue.name}
                price={venue.basePrice}
                venueType={venue.venueType}
                image={venue.images.length > 0 ? venue.images[0] : Img} // Fallback to a default image
              />
            ))
          ) : (
            <p>No venues found</p>
          )}
          
          </div>
          <button className='home-C-venue-bottom-button'> View All .. </button>
      </div>

      <div className='service-category'>
        <div className='service-category-title '>Services </div>
          <ServiceTypeCard/>
          <button className='service-category-button'> More .. </button>
      </div>

     

    </div>
  )
}

export default Home