import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLoginMutation } from "./../../features/api/apiSlice"; // Import the login mutation
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


const Login = () => {
  const navigate = useNavigate();
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

      // Display an error notification

      // Display a success notification
      notyf.success('Logged In Successfully');
      navigate("/");

      Helpers.setItem('user', userData.user ) // Redirect to the dashboard or home page
    } catch (err) {
      console.error("Failed to login:", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

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
