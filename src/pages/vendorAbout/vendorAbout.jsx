import React from 'react'
import './vendorAbout.css'

import { useNavigate } from 'react-router-dom';

const VendorAbout = () => {
    const navigate = useNavigate()

  return (
    <div className='VO-maindiv'>
        <h2 className='VO-1-0'>Welcome Vendors !!</h2>
        <p className='VO-1-1'>Thank you for considering a partnership with us. At EasyWeds , we aim to provide a seamless experience 
            for vendors to showcase their venues and services to customers. Here’s everything you 
            need to know about working with us.</p>

            <h2 className='VO-2-0'>Why Join Us?</h2>

  <div className="benefits">
    <div className="benefit">
      <h3>Increased Visibility</h3>
      <p>Get your venue or service in front of thousands of customers looking for event solutions in your area.</p>
    </div>
    <div className="benefit">
      <h3>User-Friendly Platform</h3>
      <p>Our intuitive dashboard makes it simple to manage your listings, track bookings, and engage with clients.</p>
    </div>
    <div className="benefit">
      <h3>Transparent Earnings</h3>
      <p>Earn more by reaching more customers. We charge only a small commission on successful bookings.</p>
    </div>
    <div className="benefit">
      <h3>Marketing Support</h3>
      <p>Benefit from our platform’s advertising, social media campaigns, and promotions to reach a larger audience.</p>
    </div>
  </div>


  <h2 className='VO-3-0'>How Does It Work?</h2>
 
  <div className="benefits">
    <div className="benefit">
      <h3>Sign Up as a Vendor</h3>
      <p>Register your account by providing your business details.</p>
    </div>
    <div className="benefit">
      <h3>Create Listings</h3>
      <p>Add your venues and services, including descriptions, pricing, and images.</p>
    </div>
    <div className="benefit">
      <h3>Set Your Availability</h3>
      <p>Update your calendar to ensure you’re only booked when you’re available.</p>
    </div>
    <div className="benefit">
      <h3>Receive Bookings & Earn</h3>
      <p>Customers can browse and book your services or venues.</p>
    </div>
    </div>

    <div className="commission-policy">
  <h2>Our Commission Policy</h2>
  <p>
    To maintain and promote the platform, we charge a <strong> 5 %</strong> commission on every successful booking. This commission helps us:
  </p>
  <ul>
    <li>Keep the platform running smoothly.</li>
    <li>Invest in marketing and customer acquisition.</li>
    <li>Provide ongoing support for vendors.</li>
  </ul>
  <div className="commission-buttons">
    <button onClick={()=>{navigate('/vendorLogin')}} className="btn signup-btn">Login</button>
    <button onClick={()=>{navigate('/vendorRegister')}} className="btn signin-btn">Register</button>
  </div>
</div>


    </div>
  )
}

export default VendorAbout