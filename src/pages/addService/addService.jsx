import React, { useState, useEffect } from "react";

const ServiceForm = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    images: [],
    venueList: [],
    plans: [],
  });

  const [venues, setVenues] = useState([]);
  const [newPlan, setNewPlan] = useState({ planName: "", description: "", price: "" });
  const [imageFiles, setImageFiles] = useState([]);


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

  // Handle input changes
  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  // Handle venue selection
  const handleVenueSelect = (venueId) => {
    const updatedVenues = service.venueList.some((v) => v.venueId === venueId)
      ? service.venueList.filter((v) => v.venueId !== venueId) // Remove if already selected
      : [...service.venueList, { venueId, status: "false" }];
    setService({ ...service, venueList: updatedVenues });
  };

  // Handle plan addition
  const addPlan = () => {
    if (newPlan.planName && newPlan.description && newPlan.price) {
      setService({ ...service, plans: [...service.plans, newPlan] });
      setNewPlan({ planName: "", description: "", price: "" });
    }
  };

  // Handle plan removal
  const removePlan = (index) => {
    const updatedPlans = service.plans.filter((_, i) => i !== index);
    setService({ ...service, plans: updatedPlans });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFiles([...imageFiles, ...e.target.files]); // Store selected images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append("name", service.name);
    formData.append("vendorId", service.vendorId);
    formData.append("description", service.description);
  
    // Append venue list as JSON string

  const venueIds = service.venueList.map((venue) => venue.venueId);
  formData.append("venues", JSON.stringify(venueIds));
  
    // Append plans as JSON string
    formData.append("plans", JSON.stringify(service.plans));
  
    // Append images
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
  
    try {
      const response = await fetch("/api/add/service", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Service added successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };
  

  return (
    <div className="form-container">
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Service Name:</label>
        <input type="text" name="name" value={service.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={service.description} onChange={handleChange} required />

        <label>Upload Images:</label>
        <input type="file" multiple onChange={handleImageChange} />

        <label>Select Venues:</label>
        <div className="venue-list">
          {venues.map((venue) => (
            <div key={venue._id}>
              <input
                type="checkbox"
                checked={service.venueList.some((v) => v.venueId === venue._id)}
                onChange={() => handleVenueSelect(venue._id)}
              />
              {venue.name}
            </div>
          ))}
        </div>

        <h3>Pricing Plans:</h3>
        {service.plans.map((plan, index) => (
          <div key={index} className="plan-item">
            <p>{plan.planName} - ${plan.price}</p>
            <button type="button" onClick={() => removePlan(index)}>Remove</button>
          </div>
        ))}

        <h4>Add New Plan</h4>
        <input type="text" placeholder="Plan Name" value={newPlan.planName} onChange={(e) => setNewPlan({ ...newPlan, planName: e.target.value })}  />
        <input type="text" placeholder="Description" value={newPlan.description} onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}  />
        <input type="number" placeholder="Price" value={newPlan.price} onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}  />
        <button type="button" onClick={addPlan}>Add Plan</button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ServiceForm