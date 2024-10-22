import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Helpers from "../../Config/Helpers";
import { useRegisterUserMutation } from "../../features/api/authApi"; // Import the registerUser mutation

const Register = () => {
  const navigate = useNavigate();
  
  // Hook for registerUser mutation
  const [registerUser, { isLoading }] = useRegisterUserMutation(); // Use registerUser mutation from the API

  // Local State for form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
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
      // Trigger the registerUser mutation
      const userData = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap(); // Unwrap the mutation to handle success and error states manually

      const notyf = new Notyf();
      // Display a success notification
      notyf.success("User Registered Successfully. Please verify your email to continue", 3000);
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (err) {
      // Extract the error message from the API response
      const errorMessage = err?.data?.message || "Registration failed. Please try again.";
      console.error("Failed to register:", errorMessage);
      setError(errorMessage); // Set the error message for display
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    const googleLoginUrl =
      "https://chat-arena-backend-4ba91b3feb6b.herokuapp.com/google-auth";
    window.location.href = googleLoginUrl;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const user = queryParams.get("user");

    if (token) {
      localStorage.setItem("token", token);
      const userObj = JSON.parse(user);
      localStorage.setItem("type", userObj.isAdmin);
      localStorage.setItem("user", JSON.stringify(userObj));

      window.location.href = "/dashboard"; // Redirect to dashboard after successful Google login
    }
  }, []);

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
                    <img
                      src="assets/images/logo/logo.png"
                      alt="sign-up logo"
                      style={{ height: "80px", width: "auto" }}
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <div className="social-btn-grp">
                        {/* Google login button */}
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
