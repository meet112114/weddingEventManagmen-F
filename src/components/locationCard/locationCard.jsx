import React, { useContext } from "react";
import { UserContext } from "../../App";
import "./locationCard.css"; // Add CSS for styling

const cities = [
    { name: "Mumbai", image: "/images/mumbai.jpg" },
    { name: "Pune", image: "/images/pune.jpg" },
    { name: "Nashik", image: "/images/nashik.jpg" },
    { name: "Nagpur", image: "/images/nagpur.jpg" },
    { name: "Indore", image: "/images/indore.jpg" }
];

const CitySelector = () => {
    const { state, dispatch } = useContext(UserContext);

    const handleCitySelect = (city) => {
        dispatch({ type: "SET_LOCATION", payload: city });
    };

    return (
        <div className="city-selector-container">
            <div className="city-grid">
                {cities.map((city, index) => (
                    <div 
                        key={index} 
                        className={`city-card ${state.location === city.name ? "selected" : ""}`} 
                        onClick={() => handleCitySelect(city.name)}
                    >
                        <img src={city.image} alt={city.name} className="city-image" />
                        <p className="city-card-p1">{city.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CitySelector;
