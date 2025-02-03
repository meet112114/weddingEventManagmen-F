import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './editVenue.css'
const EditVenue = () => {
    const { id } = useParams();
    const [venue, setVenue] = useState({});
    const [newImages, setNewImages] = useState([]); // New images
    const [removedImages, setRemovedImages] = useState([]); // Removed images
    const [tags, setTags] = useState([]); // Tags array
    const [newTag, setNewTag] = useState(""); // New tag input

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const res = await fetch(`/api/get/venueByID/${id}`, {
                    method: "GET",
                    credentials: "include"
                });
                const data = await res.json();
                setVenue(data);
                setTags(data.tags || []); // Load tags
            } catch (error) {
                console.error('Error fetching venue:', error);
            }
        };
        fetchVenue();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVenue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle new image selection
    const handleNewImageChange = (e) => {
        setNewImages([...newImages, ...e.target.files]); 
    };

    // Handle image removal
    const handleRemoveImage = (imageUrl) => {
        setRemovedImages([...removedImages, imageUrl]); // Mark for removal
        setVenue(prev => ({
            ...prev,
            images: prev.images.filter(img => img !== imageUrl) // Remove from UI
        }));
    };

    // Handle tag addition
    const addTag = () => {
        if (newTag.trim()) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    // Handle tag removal
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append("id", id);
        formData.append("name", venue.name);
        formData.append("vendorId", venue.vendorId);
        formData.append("venueType", venue.venueType);
        formData.append("venueDecs", venue.venueDecs);
        formData.append("address", venue.address);
        formData.append("locationUrl", venue.locationUrl);
        formData.append("location", venue.location);
        formData.append("basePrice", venue.basePrice);

        // Append tags
        formData.append("tags", JSON.stringify(tags));

        // Append removed images list
        formData.append("removedImages", JSON.stringify(removedImages));

        // Append new images
        newImages.forEach(file => formData.append("images", file));

        try {
            const res = await fetch('/api/edit/venue', {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            if (res.ok) {
                alert('Venue updated successfully!');
            } else {
                alert('Error updating venue');
            }
        } catch (error) {
            console.error('Error updating venue:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" name="name" value={venue.name || ''} onChange={handleChange} placeholder="Name" />
            <input type="text" name="vendorId" value={venue.vendorId || ''} onChange={handleChange} placeholder="Vendor ID" />
            <input type="text" name="venueType" value={venue.venueType || ''} onChange={handleChange} placeholder="Venue Type" />
            <input type="text" name="venueDecs" value={venue.venueDecs || ''} onChange={handleChange} placeholder="Venue Description" />
            <input type="text" name="address" value={venue.address || ''} onChange={handleChange} placeholder="Address" />
            <input type="text" name="locationUrl" value={venue.locationUrl || ''} onChange={handleChange} placeholder="Location URL" />
            <input type="text" name="location" value={venue.location || ''} onChange={handleChange} placeholder="Location" />
            <input type="text" name="basePrice" value={venue.basePrice || ''} onChange={handleChange} placeholder="Base Price" />

            {/* Existing Images */}
            <h3>Existing Images</h3>
            <div className="image-container">
                {venue.images && venue.images.map((imageUrl, index) => (
                    <div key={index} className="image-box">
                        <img src={"http://localhost:5000"+imageUrl} alt="venue" className="image-preview" />
                        <button type="button" onClick={() => handleRemoveImage(imageUrl)}>Remove</button>
                    </div>
                ))}
            </div>

            {/* Upload New Images */}
            <h3>Upload New Images</h3>
            <input type="file" multiple onChange={handleNewImageChange} />

            {/* Tags Management */}
            <h3>Tags</h3>
            <div className="tags-container">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag} <button type="button" onClick={() => removeTag(tag)}>x</button>
                    </span>
                ))}
            </div>
            <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="New Tag" />
            <button type="button" onClick={addTag}>Add Tag</button>

            <button type="submit">Update Venue</button>
        </form>
    );
};

export default EditVenue;
