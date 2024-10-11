import React from 'react'

const Footer = () => {
  return (
    <>
       <footer className="rainbow-footer footer-style-default footer-style-3 position-relative">
            <div className="footer-top">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="rainbow-footer-widget">
                      <div className="logo">
                        <a href="index.html">
                          <img
                            className="logo-light"
                            src="assets/images/logo/logo.png"
                            alt="ChatBot Logo"
                          />
                        </a>
                      </div>
                      <p className="b1 desc-text">
                        It has long been known that a reader's <br /> attention
                        will be diverted from{" "}
                      </p>
                      <h6 className="subtitle">Join a Newsletter</h6>
                      <form className="newsletter-form" action="#">
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Enter Your Email Here"
                          />
                          <button
                            className="btn-default bg-solid-primary"
                            type="submit"
                          >
                            <i className="fa-sharp fa-regular fa-arrow-right" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <div className="rainbow-footer-widget">
                      <div className="widget-menu-bottom">
                        <h4 className="title">Quick Links</h4>
                        <div className="inner">
                          <ul className="footer-link link-hover">
                            <li>
                              <a href="#">Pages</a>
                            </li>
                            <li>
                              <a href="blog.html">Blog</a>
                            </li>
                            <li>
                              <a href="contact%2chtml.html">Contact</a>
                            </li>
                            <li>
                              <a href="utilize.html">How to use</a>
                            </li>
                            <li>
                              <a href="roadmap.html">Roadmap</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <div className="rainbow-footer-widget">
                      <div className="widget-menu-top">
                        <h4 className="title">Services</h4>
                        <div className="inner">
                          <ul className="footer-link link-hover">
                            <li>
                              <a href="image-generator.html">Image Generator</a>
                            </li>
                            <li>
                              <a href="vedio-generator.html">Video Generator</a>
                            </li>
                            <li>
                              <a href="text-generator.html">Text Generator</a>
                            </li>
                            <li>
                              <a href="code-generator.html">Code Generator</a>
                            </li>
                            <li>
                              <a href="#">Education Feedback</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div className="rainbow-footer-widget">
                      <div className="widget-menu-top">
                        <h4 className="title">Contact</h4>
                        <div className="inner">
                          <ul className="footer-link contact-link">
                            <li>
                              <i className="contact-icon fa-regular fa-location-dot" />
                              <a href="#">
                                8819 Ohio St. South Gate, North America, USA
                              </a>
                            </li>
                            <li>
                              <i className="contact-icon fa-sharp fa-regular fa-envelope" />
                              <a href="#">example@domain.com</a>
                            </li>
                            <li>
                              <i className="contact-icon fa-regular fa-phone" />
                              <a href="#">+1 386-688-3295</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
    </>
  )
}

export default Footer