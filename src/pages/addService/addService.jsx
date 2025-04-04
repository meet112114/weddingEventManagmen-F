import React, { useState, useEffect } from "react";
import './addService.css'

const ServiceForm = () => {
  const [service, setService] = useState({
    name: "",
    serviceType:"",
    description: "",
    images: [],
    venueList: [],
    plans: [],
  });

  const [venues, setVenues] = useState([]);
  const [newPlan, setNewPlan] = useState({ planName: "", description: "", price: "" });
  const [imageFiles, setImageFiles] = useState([]);
  const [profile, setProfile] = useState('');

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

  },[])

   useEffect(() => {
      const fetchVenues = async () => {
        try {
          const res = await fetch(`/api/get/venue/${profile.location}`);
          const data = await res.json();
          setVenues(data);
        } catch (error) {
          console.error('Error fetching venues:', error);
        }
      };
  
      fetchVenues();
    }, [profile]);

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
    formData.append("serviceType" , service.serviceType)
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
        <div className="main-div">
            <h2>Add Service</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="sub-Body">


<div className="contaiiner1"> 


<h4>Service Name:</h4>
<input type="text" name="name" value={service.name} onChange={handleChange} required />

<h4>Description:</h4>
<textarea name="description" value={service.description} onChange={handleChange} required />

<h4>Upload Images:</h4>
<input type="file" multiple onChange={handleImageChange} />

<select className="service-input" name="serviceType" value={service.venueType} onChange={handleChange} required>
          <option value="" >Select Service Type</option>
          <option value="food">Food</option>
          <option value="decoration">Decoration</option>
          <option value="photography">Photography</option>
          <option value="makeup">Makeup</option>
          <option value="mehndi">Mehndi</option>
          <option value="jewellery">Jewellery</option>
          <option value="bridalwear">Bridalwear</option>
          <option value="groomwear">Groomwear</option>
          <option value="pandit">Pandit</option>
          <option value="others">others</option>
        </select>

</div>


<div className="contaiiner2 ">

<h4>Select Venues In {profile.location || "loading .."} </h4>
<div className="venue-list">
  {venues.map((venue) => (
    <div key={venue._id}>
      <span className="venue-name">{venue.name}</span> 
      <input
        type="checkbox"
        checked={service.venueList.some((v) => v.venueId === venue._id)}
        onChange={() => handleVenueSelect(venue._id)}
      />
    </div>
  ))}
</div>

</div>

<div className="contaiiner3">

<h4>Add New Plan</h4>
<input type="text" placeholder="Plan Name" value={newPlan.planName} onChange={(e) => setNewPlan({ ...newPlan, planName: e.target.value })}  />
<input type="text" placeholder="Description" value={newPlan.description} onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}  />
<input type="number" placeholder="Price" value={newPlan.price} onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}  />
<button type="button" onClick={addPlan}>Add Plan</button>


<div className="plan-items">
{service.plans.map((plan, index) => (
  <div key={index} className="plan-item">
    <p>{plan.planName} - ${plan.price}</p>
    <button type="button" onClick={() => removePlan(index)}>Remove</button>
  </div>
))}
</div>


</div>
        </div>
        <div className="button-container">
  <button type="submit">Submit</button>
</div>

        
        </form>
        </div>
  );
};

export default ServiceForm