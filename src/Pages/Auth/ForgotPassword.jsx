import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // Handle email input
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would call your API to send the reset password link to the email
    console.log("Reset password email sent to:", email);
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
                    <img src="assets/images/logo/logo.png" alt="sign-up logo" />
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
                            className="text-center"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <Button type="submit" className="btn-default mt-4">
                          Send Reset Link
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
