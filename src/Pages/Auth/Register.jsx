import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Helpers from "../../Config/Helpers";
import { useRegisterUserMutation } from "../../features/api/authApi"; // Import the registerUser mutation
import Logo from '../../../public/assets/images/logo/logo.png'

const Register = () => {
  const navigate = useNavigate();

  // Hook for registerUser mutation
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // Local State for form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Individual error states for each field
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState(null); // General error

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear specific error when the user starts typing
    if (name === "name") setNameError("");
    if (name === "username") setUsernameError("");
    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
    if (name === "confirmPassword") setConfirmPasswordError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset general error message

    // Validate form data
    let hasError = false;

    if (!formData.name) {
      setNameError("Name is required");
      hasError = true;
    }
    if (!formData.username) {
      setUsernameError("Username is required");
      hasError = true;
    }
    if (!formData.email) {
      setEmailError("Email is required");
      hasError = true;
    }
    if (!formData.password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      hasError = true;
    }
    if (!formData.confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    try {
      // Trigger the registerUser mutation
      const userData = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      const notyf = new Notyf();
      notyf.success("User Registered Successfully. Please verify your email to continue", 3000);
      navigate("/user-verification");
    } catch (err) {
      const errorMessage = err?.data?.message || "Registration failed. Please try again.";
      console.error("Failed to register:", errorMessage);
      setError(errorMessage);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    const googleLoginUrl = "http://ec2-13-60-19-246.eu-north-1.compute.amazonaws.com/google-auth";
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

      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div>
      <main className="page-wrapper">
        <div className="signup-area">
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-6 bg-color-blackest left-wrapper">
                <div className="sign-up-box">
                  <div className="signup-box-top">
                    <img
                      src={Logo}
                      alt="sign-up logo"
                      style={{ height: "80px", width: "auto" }}
                      onError={(e) => (e.target.src = Logo)}
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <div className="social-btn-grp">
                        <button className="btn-default btn-border" onClick={handleGoogleLogin}>
                          <span className="icon-left">
                            <img src="assets/images/sign-up/google.png" alt="Google Icon" />
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
                          {nameError && <p className="text-danger">{nameError}</p>}
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
                          {usernameError && <p className="text-danger">{usernameError}</p>}
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
                          {emailError && <p className="text-danger">{emailError}</p>}
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
                          {passwordError && <p className="text-danger">{passwordError}</p>}
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
                          {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="btn-default" disabled={isLoading}>
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
      </main>
    </div>
  );
};

export default Register;
