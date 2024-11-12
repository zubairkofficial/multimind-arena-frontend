import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const UserVerification = () => {
  const navigate = useNavigate();
  const notyf = new Notyf();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      notyf.success("You are already verified! Redirecting to your dashboard...");
      navigate("/dashboard");
    }
  }, [navigate, notyf]);

  // Handle navigation to login page
  const handleContinueToLogin = () => {
    navigate("/login");
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
                    <img
                      src="assets/images/logo/logo.png"
                      alt="verification logo"
                      style={{ height: "80px", width: "auto" }}
                    />
                  </div>
                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      <h2>Email Verification Required</h2>
                      <p>
                        Please verify your email address to continue. We have sent a
                        verification link to your registered email. Click the link in the
                        email to complete the verification process.
                      </p>
                      <div className="actions">
                        <button
                          className="btn-default"
                          onClick={handleContinueToLogin}
                        >
                          Continue to Sign In
                        </button>
                        {/* <Link className="btn-read-more ml--5" to="/resend-verification">
                          Resend Verification Email
                        </Link> */}
                      </div>
                    </div>
                    {/* <div className="signup-box-footer">
                      <div className="bottom-text">
                        Already verified?{" "}
                        <Link className="btn-read-more ml--5" to="/login">
                          <span>Sign In</span>
                        </Link>
                      </div>
                    </div> */}
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

export default UserVerification;
