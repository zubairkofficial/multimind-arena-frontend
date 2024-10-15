import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { Link,useLocation } from "react-router-dom";
import { useLoginMutation } from "./../../features/api/apiSlice"; // Import the login mutation
import { useDispatch } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Helpers from "../../Config/Helpers";
import { setUser } from "./../../features/userSlice";
import axios from "axios"; // Import the userSlice action

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation(); // Hook to trigger the login API
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email || !formData.password) {
      setError("Both fields are required");
      return;
    }

    try {
      // Call the login API
      const userData = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("User logged in:", userData);
      var notyf = new Notyf();

      // Display a success notification
      notyf.success("Logged In Successfully");

      // Update the user in the userSlice
      dispatch(setUser(userData.user));

      // Save user data in localStorage
      const userString = JSON.stringify(userData.user);
      Helpers.setItem("user", userString);
      Helpers.setItem("type", userData.user.isAdmin);
      Helpers.setItem("token", userData.token);
      const user = JSON.parse(userString);

      // Redirect to the dashboard or home page
      if (user.isAdmin === true) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Failed to login:", err);
      setError("Login failed. Please check your credentials and try again.");
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
                      <div className="social-btn-grp">
                        {/* Google Login Button */}
                        <button
                          className="btn-default btn-border"
                          onClick={handleGoogleLogin}
                        >
                          <span className="icon-left">
                            <img
                              src="assets/images/sign-up/google.png"
                              alt="Google Icon"
                            />
                          </span>
                          Continue with Google
                        </button>
                      </div>
                      <div className="text-social-area">
                        <hr />
                        <span>Or continue with</span>
                        <hr />
                      </div>
                      <form onSubmit={handleSubmit}>
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
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="forget-text">
                          <Link className="btn-read-more" to="/forgot-password">
                            <span>Forgot password</span>
                          </Link>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button
                          type="submit"
                          className="btn-default"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                      </form>
                    </div>
                    <div className="signup-box-footer">
                      <div className="bottom-text">
                        Don't have an account?{" "}
                        <Link className="btn-read-more ml--5" to="/register">
                          <span>Sign Up</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="close-button" to="/register">
            <i className="fa-sharp fa-regular fa-arrow-left" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;