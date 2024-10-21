import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { useLoginMutation } from "./../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Helpers from "../../Config/Helpers";
import { setUser } from "./../../features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle user redirection and localStorage setting
  const handleLoginSuccess = (userData) => {
    const notyf = new Notyf();
    notyf.success("Logged In Successfully");

    // Update user in the Redux store
    dispatch(setUser(userData.user));

    // Save user data in localStorage
    const userString = JSON.stringify(userData.user);
    Helpers.setItem("user", userString);
    Helpers.setItem("type", userData.user.isAdmin);
    Helpers.setItem("token", userData.token);

    // Redirect based on user role
    if (userData.user.isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Both fields are required");
      return;
    }

    try {
      const userData = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      handleLoginSuccess(userData);
    } catch (err) {
      console.error("Failed to login:", err);
      setError(err?.data?.message || "Login failed. Please check your credentials and try again.");
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    const googleLoginUrl = "https://chat-arena-backend-4ba91b3feb6b.herokuapp.com/google-auth";
    window.location.href = googleLoginUrl;
  };

  // Handle Google OAuth redirection
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const user = queryParams.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      const userObj = JSON.parse(user);
      localStorage.setItem("type", userObj.isAdmin);
      localStorage.setItem("user", JSON.stringify(userObj));

      handleLoginSuccess({ user: userObj, token });
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
                    <img
                      src="assets/images/logo/logo.png"
                      alt="sign-up logo"
                      style={{ height: "80px", width: "auto" }}
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <div className="social-btn-grp">
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
          <Link className="close-button" to="/">
            <i className="fa-sharp fa-regular fa-arrow-left" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
