import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchPage.css";

const searchData = [
  // Venues
  { id: "ac", name: "Venues With AC", type: "venue" },
  { id: "pool", name: "Venues With Pool", type: "venue" },
  { id: "lawn", name: "Venues With Lawn", type: "venue" },
  { id: "outdoor", name: "Outdoor Venues", type: "venue" },
  { id: "mandap", name: "Mandap Weddings", type: "venue" },
  { id: "resort", name: "Wedding Resort", type: "venue" },

  // Services
  { id: "bridalwear", name: "Bridalwear", type: "service" },
  { id: "groomwear", name: "Groomwear", type: "service" },
  { id: "pandit", name: "Wedding Pandits", type: "service" },
  { id: "jewellery", name: "Wedding Jewellery", type: "service" },
  { id: "makeup", name: "Makeup", type: "service" },
  { id: "photography", name: "Wedding Photography", type: "service" },
  { id: "decoration", name: "Wedding Decoration", type: "service" },
  { id: "food", name: "Food", type: "service" },
  { id: "mehndi", name: "Designer Mehndi", type: "service" },

  // Outfits
  { id: "1", name: "Maharashtrian Outfit", type: "outfit" },
  { id: "2", name: "Punjabi Outfit", type: "outfit" },
  { id: "3", name: "Gujarati Outfit", type: "outfit" },
  { id: "4", name: "Kashmiri Outfit", type: "outfit" },
  { id: "5", name: "South-Indian Outfit", type: "outfit" },
  { id: "6", name: "Bengali Outfit", type: "outfit" },
  { id: "7", name: "Muslim Outfit", type: "outfit" },
  { id: "8", name: "Buddhist Outfit", type: "outfit" },
  { id: "9", name: "Christian Outfit", type: "outfit" },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm === "") {
      setFilteredResults([]);
    } else {
      const results = searchData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setFilteredResults(results);
    }
  };

  const handleNavigate = (type, id) => {
    if (type === "venue") {
      navigate(`/VenuesCat/${id}`);
    } else if (type === "service") {
      navigate(`/ServicesCat/${id}`);
    } else if (type === "outfit") {
      navigate(`/outfit/${id}`);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search venues, services, outfits..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredResults.length > 0 && (
        <ul className="search-dropdown">
          {filteredResults.map((item) => (
            <li key={item.id} onClick={() => handleNavigate(item.type, item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
