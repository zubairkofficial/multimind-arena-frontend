import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Logo from '../../../public/assets/images/logo/logo.png'

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");

  // Handle OTP input
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <main className="page-wrapper">
        {/* Start Verify Email Area */}
        <div className="signup-area">
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-6 bg-color-blackest left-wrapper">
                <div className="sign-up-box">
                  <div className="signup-box-top">
                    <img src={Logo} alt="sign-up logo"   onError={(e) => e.target.src = Logo} // Fallback to Logo if the image fails to load
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <h4 className="mb-4">Verify Your Email</h4>
                      <p className="mb-4">
                        We've sent a 6-digit OTP to your email. Please enter it
                        below to verify your account.
                      </p>
                      <Form>
                        <div className="otp-section">
                          <Form.Control
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={handleChange}
                            className="text-center display-1"
                            placeholder="Enter OTP"
                          />
                        </div>
                        <Button type="submit" className="btn-default mt-4">
                          Verify Email
                        </Button>
                      </Form>
                    </div>
                    <div className="signup-box-footer">
                      <div className="bottom-text">
                        Didn't receive the code?{" "}
                        <a className="btn-read-more ml--5" href="#">
                          <span>Resend OTP</span>
                        </a>
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
        {/* End Verify Email Area */}
      </main>
    </div>
  );
};

export default VerifyEmail;
