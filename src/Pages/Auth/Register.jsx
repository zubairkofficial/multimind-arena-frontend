import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  useRegisterUserMutation,
  useLoginWithGoogleMutation,
} from "./../../features/api/apiSlice"; // Import the register and Google login mutation
import Helpers from "../../Config/Helpers";
import { Notyf } from "notyf";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation(); // Hook to trigger the register API
  const [loginWithGoogle] = useLoginWithGoogleMutation(); // Hook to trigger Google login API

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous error messages

    // Validate form data
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the register API
      const userData = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("User registered:", userData);
      var notyf = new Notyf();

      // Display a success notification
      notyf.success(
        "User Registered Successfully. Please Verify your email to continue",
        3000
      );
      navigate("/login"); // Redirect to the login page
    } catch (err) {
      console.error("Failed to register:", err);
      setError("Registration failed. Please try again.");
    }
  };

 
  // Handle Google login
  const handleGoogleLogin = () => {
    const googleLoginUrl = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http://localhost:8080/google-auth/redirect&scope=email profile&client_id=730787481005-daqp7eagna4m0evft1l5nhp2aspijmb3.apps.googleusercontent.com";
  console.log(googleLoginUrl)

  
    window.location.href = googleLoginUrl;
  };
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log("path",queryParams)
    const token = queryParams.get('token');
    const user = queryParams.get('user');
    console.log("Query Parameters:", [...queryParams]); // Convert to array for better logging

    if (token) {
      localStorage.setItem('token', token);
      console.log("user",JSON.parse(user))
      const result=JSON.stringify(JSON.parse(user))
      localStorage.setItem('user', result); // Optionally store userId

     
      window.location.href = '/'; // Adjust as necessary
    }
  }, [location]);


  return (
    <div>
      <main className="page-wrapper">
        {/* Start Sign up Area */}
        <div className="signup-area">
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-6 bg-color-blackest left-wrapper">
                <div className="sign-up-box">
                  <div className="signup-box-top">
                    <img src="assets/images/logo/logo.png" alt="sign-up logo" />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <div class="social-btn-grp">
                        {/* Google login button */}
                        <button
                          class="btn-default btn-border"
                          onClick={handleGoogleLogin}
                        >
                          <span class="icon-left">
                            <img
                              src="assets/images/sign-up/google.png"
                              alt="Google Icon"
                            />
                          </span>
                          Continue with Google
                        </button>
                      </div>
                      <div class="text-social-area">
                        <hr />
                        <span>Or continue with</span>
                        <hr />
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="input-section">
                          <div className="icon">
                            <i className="feather-user" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-section">
                          <div className="icon">
                            <i className="feather-user" />
                          </div>
                          <input
                            type="text"
                            name="username"
                            placeholder="Enter Your Username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-section mail-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-envelope" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-section password-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-lock" />
                          </div>
                          <input
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-section password-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-lock" />
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button
                          type="submit"
                          className="btn-default"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                      </form>
                    </div>
                    <div className="signup-box-footer">
                      <div className="bottom-text">
                        Do you have an account?{" "}
                        <Link className="btn-read-more ml--5" to="/login">
                          <span>Sign In</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="close-button" to="/">
            <i className="fa-sharp fa-regular fa-arrow-left" />
          </Link>
        </div>
        {/* End Sign up Area */}
      </main>
    </div>
  );
};

export default Register;
