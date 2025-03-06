import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import "./adminLogin.css";
import BGIMG from  '../../../assets/images/bg1.jpg'

const AdminLogin = () => { 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
    const { state  , dispatch} = useContext(UserContext);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Login Submission
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (formData.email === "admin" && formData.password === "admin") {
      dispatch({ type: "ADMIN_LOGIN", payload: true }); // Assuming Redux or Context API
      alert("Login Successful! Redirecting to Admin Panel...");
      navigate("/admin"); // Redirect to Admin Panel
    } else {
      alert("Wrong Credentials! Access Denied.");
    }
  };

  return (
    <div  className="AP-main-div"
          style={{
            backgroundImage: `url(${BGIMG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}>
        <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          name="email" 
          placeholder="Enter Admin Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Admin Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;

