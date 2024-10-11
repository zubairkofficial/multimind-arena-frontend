import React from "react";

const Pricing = () => {
  return (
    <>
      <div className="aiwave-pricing-area wrapper rainbow-section-gap-big">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center"
                data-sal="slide-up"
                data-sal-duration={400}
                data-sal-delay={150}
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">Pricing</span>
                </h4>
                <h2 className="title w-600 mb--40">
                  Pricing plans for everyone
                </h2>
              </div>
              <nav className="aiwave-tab">
                <div
                  className="tab-btn-grp nav nav-tabs text-center justify-content-center"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="false"
                  >
                    Monthly
                  </button>
                  <button
                    className="nav-link with-badge active"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="true"
                  >
                    Yearly
                    <span className="rainbow-badge-card badge-border">
                      -10%
                    </span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div
            className="tab-content p-0 bg-transparent border-0 border bg-light"
            id="nav-tabContent"
          >
            <div
              className="tab-pane fade"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div className="row row--15 mt_dec--40">
                <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--40">
                  <div className="rainbow-pricing style-aiwave">
                    <div className="pricing-table-inner">
                      <div className="pricing-top">
                        <div className="pricing-header">
                          <div className="icon">
                            <i className="fa-regular fa-circle-radiation" />
                          </div>
                          <h4 className="title color-var-one">Basic</h4>
                          <p className="subtitle">
                            For large teams &amp; corportaions
                          </p>
                          <div className="pricing">
                            <span className="price-text">Free</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <div className="features-section">
                            <h6>Features</h6>
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                7,700 3-5 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                AI Blog Updates via dashboard &amp; slack
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                Advance Updates via dashboard &amp; slack
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pricing-footer">
                        <a className="btn-default btn-border" href="#">
                          Get Started
                        </a>
                        <p className="bottom-text">Limited Offer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--40">
                  <div className="rainbow-pricing style-aiwave active">
                    <div className="pricing-table-inner">
                      <div className="pricing-top">
                        <div className="pricing-header">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-flower" />
                          </div>
                          <h4 className="title color-var-two">Premium</h4>
                          <p className="subtitle">
                            For large teams &amp; corportaions
                          </p>
                          <div className="pricing">
                            <span className="price-text">$60.50</span>
                            <span className="text">/Per Month</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <div className="features-section has-show-more">
                            <h6>Features</h6>
                            <ul className="list-style--1 has-show-more-inner-content">
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                12,700 7-9 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                7,700 3-5 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                AI Blog Updates via dashboard &amp; slack
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                Advance Updates via dashboard &amp; slack
                              </li>
                            </ul>
                            <div className="rbt-show-more-btn">Show More</div>
                          </div>
                        </div>
                      </div>
                      <div className="pricing-footer">
                        <a className="btn-default color-blacked" href="#">
                          Get Started
                        </a>
                        <p className="bottom-text">Limited Offer</p>
                      </div>
                    </div>
                    <div className="feature-badge">Best Offer</div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--40">
                  <div className="rainbow-pricing style-aiwave">
                    <div className="pricing-table-inner">
                      <div className="pricing-top">
                        <div className="pricing-header">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-waveform-lines" />
                          </div>
                          <h4 className="title color-var-three">Enterprise</h4>
                          <p className="subtitle">
                            For large teams &amp; corportaions
                          </p>
                          <div className="pricing">
                            <span className="price-text">$80.50</span>
                            <span className="text">/Per Month</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <div className="features-section has-show-more">
                            <h6>Features</h6>
                            <ul className="list-style--1 has-show-more-inner-content">
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                15,700 15-30 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                7,700 3-5 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                AI Blog Updates via dashboard &amp; slack
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                Advance Updates via dashboard &amp; slack
                              </li>
                            </ul>
                            <div className="rbt-show-more-btn">Show More</div>
                          </div>
                        </div>
                      </div>
                      <div className="pricing-footer">
                        <a className="btn-default btn-border" href="#">
                          Get Started
                        </a>
                        <p className="bottom-text">Limited Offer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade active show"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div className="row row--15 mt_dec--40">
                <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--40">
                  <div className="rainbow-pricing style-aiwave">
                    <div className="pricing-table-inner">
                      <div className="pricing-top">
                        <div className="pricing-header">
                          <div className="icon">
                            <i className="fa-regular fa-circle-radiation" />
                          </div>
                          <h4 className="title color-var-one">Basic</h4>
                          <p className="subtitle">
                            For large teams &amp; corportaions
                          </p>
                          <div className="pricing">
                            <span className="price-text">Free</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <div className="features-section">
                            <h6>Features</h6>
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                7,700 3-5 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                AI Blog Updates via dashboard &amp; slack
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                Advance Updates via dashboard &amp; slack
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pricing-footer">
                        <a className="btn-default btn-border" href="#">
                          Get Started
                        </a>
                        <p className="bottom-text">Limited Offer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--40">
                  <div className="rainbow-pricing style-aiwave active">
                    <div className="pricing-table-inner">
                      <div className="pricing-top">
                        <div className="pricing-header">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-flower" />
                          </div>
                          <h4 className="title color-var-two">Premium</h4>
                          <p className="subtitle">
                            For large teams &amp; corportaions
                          </p>
                          <div className="pricing">
                            <span className="price-text">$499.00</span>
                            <span className="text">/Per Year</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <div className="features-section has-show-more">
                            <h6>Features</h6>
                            <ul className="list-style--1 has-show-more-inner-content">
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                12,700 7-9 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                7,700 3-5 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                AI Blog Updates via dashboard &amp; slack
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                Advance Updates via dashboard &amp; slack
                              </li>
                            </ul>
                            <div className="rbt-show-more-btn">Show More</div>
                          </div>
                        </div>
                      </div>
                      <div className="pricing-footer">
                        <a className="btn-default color-blacked" href="#">
                          Get Started
                        </a>
                        <p className="bottom-text">Limited Offer</p>
                      </div>
                    </div>
                    <div className="feature-badge">Best Offer</div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-12 mt--40">
                  <div className="rainbow-pricing style-aiwave">
                    <div className="pricing-table-inner">
                      <div className="pricing-top">
                        <div className="pricing-header">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-waveform-lines" />
                          </div>
                          <h4 className="title color-var-three">Enterprise</h4>
                          <p className="subtitle">
                            For large teams &amp; corportaions
                          </p>
                          <div className="pricing">
                            <span className="price-text">$599.00</span>
                            <span className="text">/Per Year</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <div className="features-section has-show-more">
                            <h6>Features</h6>
                            <ul className="list-style--1 has-show-more-inner-content">
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                15,700 15-30 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />{" "}
                                7,700 3-5 day turnarouord
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 6+
                                Naive development
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" /> 5+
                                Task delivered one-by-one
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                AI Blog Updates via dashboard &amp; slack
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-minus-circle" />{" "}
                                Advance Updates via dashboard &amp; slack
                              </li>
                            </ul>
                            <div className="rbt-show-more-btn">Show More</div>
                          </div>
                        </div>
                      </div>
                      <div className="pricing-footer">
                        <a className="btn-default btn-border" href="#">
                          Get Started
                        </a>
                        <p className="bottom-text">Limited Offer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
