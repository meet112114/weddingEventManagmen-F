import React, { useState, useEffect } from 'react';
import VenueCard from '../../components/cards/venueCard';
import './venuesC.css'

const VenuesC = () => {
  const [venues, setVenues] = useState([]); // All venues
  const [filteredVenues, setFilteredVenues] = useState([]); // Filtered venues
  const [filters, setFilters] = useState({
    priceRange: '',
    types: [],
    location: '',
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch('/api/getAllVenue');
        const data = await res.json();
        setVenues(data);
        setFilteredVenues(data); // Initialize with all venues
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFilters((prev) => {
      if (name === 'types') {
        const updatedTypes = checked
          ? [...prev.types, value]
          : prev.types.filter((type) => type !== value);
        return { ...prev, types: updatedTypes };
      } else if (type === 'text' || type === 'select-one') {
        return { ...prev, [name]: value };
      }
      return prev;
    });
  };

  useEffect(() => {
    let updatedVenues = [...venues];

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      updatedVenues = updatedVenues.filter(
        (venue) => venue.basePrice >= min && venue.basePrice <= max
      );
    }

    if (filters.types.length > 0) {
      updatedVenues = updatedVenues.filter((venue) =>
        filters.types.includes(venue.venueType)
      );
    }

    if (filters.location) {
      updatedVenues = updatedVenues.filter((venue) =>
        venue.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredVenues(updatedVenues);
  }, [filters, venues]);

  return (
    <div className="venueCpage">
        <h3>Filters</h3>
      <div className="filters">
        
        <div className="filter-group">
          <h4>Price Range</h4>
          <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="0-1000">0 - 1000</option>
            <option value="1000-5000">1000 - 5000</option>
            <option value="5000-10000">5000 - 10000</option>
          </select>
        </div>

        <div className="filter-group">
          <h5>Venue Type</h5>
          <select name="types" value={filters.types} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="AC_Lawn_hall">AC_Lawn_hall</option>
            <option value="AC_hall">AC_hall</option>
          </select>
        </div>

        <div className="filter-group">
          <h5>Location</h5>
          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
            <option value="nashik">Nashik</option>
          </select>
        </div>
      </div>

      <div className="venueC-list">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueCard
              key={venue._id}
              name={venue.name}
              price={venue.basePrice}
              venueType={venue.venueType}
              image={venue.images[0]} // Fallback to a default image
            />
          ))
        ) : (
          <p>No venues found</p>
        )}
      </div>
    </div>
  );
};

export default VenuesC;
