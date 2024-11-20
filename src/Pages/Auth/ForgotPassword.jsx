import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/api/authApi"; // Import the forgotPassword hook
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Logo from '../../../public/assets/images/logo/logo.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State to track email validation error
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); // Hook for forgotPassword mutation
  const notyf = new Notyf();

  // Regular expression for email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input
  const handleChange = (e) => {
    setEmail(e.target.value);

    // Validate email in real-time
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Clear error if email is valid
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final email validation before submission
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      // Trigger the forgot password mutation
      await forgotPassword(email).unwrap();
      // Show success toast
      setEmail("")
      notyf.success("Reset password email sent successfully.");
    } catch (err) {
      // Show error message
      notyf.error(err?.data?.message || "Failed to send reset email. Please try again.");
    }
  };

  return (
    <div>
      <main className="page-wrapper">
        {/* Start Forgot Password Area */}
        <div className="signup-area">
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-6 bg-color-blackest left-wrapper">
                <div className="sign-up-box">
                  <div className="signup-box-top">
                    <img
                      src={Logo}
                      alt="sign-up logo"
                      onError={(e) => (e.target.src = Logo)} // Fallback to Logo if the image fails to load
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <h4 className="mb-4">Forgot Your Password?</h4>
                      <p className="mb-4">
                        Enter your email address below and we'll send you a link
                        to reset your password.
                      </p>
                      <Form onSubmit={handleSubmit}>
                        <div className="email-section">
                          <Form.Control
                            type="email"
                            value={email}
                            onChange={handleChange}
                            className={`text-center ${
                              emailError ? "is-invalid" : ""
                            }`}
                            placeholder="Enter your email"
                          />
                          {emailError && (
                            <div className="text-danger mt-2">{emailError}</div>
                          )}
                        </div>
                        <Button
                          type="submit"
                          className="btn-default mt-4"
                          disabled={isLoading || emailError}
                        >
                          {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                      </Form>
                    </div>
                    <div className="signup-box-footer">
                      <div className="bottom-text">
                        Remember your password?{" "}
                        <Link className="btn-read-more ml--5" to="/login">
                          <span>Login</span>
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
        {/* End Forgot Password Area */}
      </main>
    </div>
  );
};

export default ForgotPassword;
