import React from "react";

const TabArea = () => {
  return (
    <div className="rainbow-service-area rainbow-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="section-title text-center pb--60"
              data-sal="slide-up"
              data-sal-duration={700}
              data-sal-delay={100}
            >
              <h4 className="subtitle">
                <span className="theme-gradient">
                  RAINBOW UNLOCKS THE POTENTIAL ai
                </span>
              </h4>
              <h2 className="title mb--0">
                Generative AI made for <br /> creators.
              </h2>
            </div>
          </div>
        </div>
        <div className="row row--30 align-items-center">
          <div className="col-lg-12">
            <div className="rainbow-default-tab style-three generator-tab-defalt">
              <ul className="nav nav-tabs tab-button" role="tablist">
                <li className="nav-item tabs__tab " role="presentation">
                  <button
                    className="nav-link rainbow-gradient-btn without-shape-circle"
                    id="video-generator-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#video-generate"
                    type="button"
                    role="tab"
                    aria-controls="video-generate"
                    aria-selected="false"
                  >
                    <span className="generator-icon">
                      <img
                        src="assets/images/icons/video-g.png"
                        alt="Vedio Generator Icon"
                      />
                      Video Generator
                    </span>
                  </button>
                </li>
                <li className="nav-item tabs__tab" role="presentation">
                  <button
                    className="nav-link rainbow-gradient-btn without-shape-circle active"
                    id="audio-generator-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#audio-generate"
                    type="button"
                    role="tab"
                    aria-controls="audio-generate"
                    aria-selected="true"
                  >
                    <span className="generator-icon">
                      <img
                        src="assets/images/icons/audio-g.png"
                        alt="Vedio Generator Icon"
                      />
                      Audio Generator
                    </span>

                  </button>
                </li>
                <li className="nav-item tabs__tab " role="presentation">
                  <button
                    className="nav-link rainbow-gradient-btn without-shape-circle"
                    id="photo-generator-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#photo-generate"
                    type="button"
                    role="tab"
                    aria-controls="photo-generate"
                    aria-selected="false"
                  >
                    <span className="generator-icon">
                      <img
                        src="assets/images/icons/photo-g.png"
                        alt="Vedio Generator Icon"
                      />
                      Photo Generator
                    </span>

                  </button>
                </li>
                <li className="nav-item tabs__tab " role="presentation">
                  <button
                    className="nav-link rainbow-gradient-btn without-shape-circle"
                    id="text-generator-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#text-generate"
                    type="button"
                    role="tab"
                    aria-controls="text-generate"
                    aria-selected="false"
                  >
                    <span className="generator-icon">
                      <img
                        src="assets/images/icons/text-g.png"
                        alt="Vedio Generator Icon"
                      />
                      Text Generator
                    </span>

                  </button>
                </li>
                <li className="nav-item tabs__tab " role="presentation">
                  <button
                    className="nav-link rainbow-gradient-btn without-shape-circle"
                    id="code-generator-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#code-generate"
                    type="button"
                    role="tab"
                    aria-controls="code-generate"
                    aria-selected="false"
                  >
                    <span className="generator-icon">
                      <img
                        src="assets/images/icons/code-g.png"
                        alt="Vedio Generator Icon"
                      />
                      Code Generator
                    </span>
                  </button>
                </li>
              </ul>
              <div className="rainbow-tab-content tab-content">
                <div
                  className="tab-pane fade"
                  id="video-generate"
                  role="tabpanel"
                  aria-labelledby="video-generator-tab"
                >
                  <div className="inner">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="section-title">
                          <h2 className="title">
                            Video generating AI refers to artificial
                            intelligence.
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Transformer Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Conditional Generative Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Pre-trained Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Variational Autoencoders
                              </li>
                            </ul>
                          </div>
                          <div className="read-more">
                            <a className="btn-default color-blacked" href="#">
                              Start Exploring Now{" "}
                              <i className="fa-sharp fa-solid fa-arrow-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 mt_md--30 mt_sm--30">
                        <div className="export-img">
                          <div className="inner-without-padding">
                            <div className="export-img img-bg-shape">
                              <img
                                src="assets/images/generator-img/chat-export-vedio.png"
                                alt="Chat example Image"
                              />
                              <div className="image-shape" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="audio-generate"
                  role="tabpanel"
                  aria-labelledby="audio-generator-tab"
                >
                  <div className="inner">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="section-title">
                          <h2 className="title">
                            Audio generating AI refers to artificial
                            intelligence.
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Transformer Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Conditional Generative Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Pre-trained Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Variational Autoencoders
                              </li>
                            </ul>
                          </div>
                          <div className="read-more">
                            <a className="btn-default color-blacked" href="#">
                              Start Exploring Now{" "}
                              <i className="fa-sharp fa-solid fa-arrow-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 mt_md--30 mt_sm--30">
                        <div className="export-img">
                          <div className="inner-without-padding">
                            <div className="export-img img-bg-shape">
                              <img
                                src="assets/images/generator-img/chat-export-audio.png"
                                alt="Chat example Image"
                              />
                              <div className="image-shape" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="photo-generate"
                  role="tabpanel"
                  aria-labelledby="photo-generator-tab"
                >
                  <div className="inner">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="section-title">
                          <h2 className="title">
                            Photo generating AI refers to artificial
                            intelligence.
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Transformer Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Conditional Generative Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Pre-trained Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Variational Autoencoders
                              </li>
                            </ul>
                          </div>
                          <div className="read-more">
                            <a className="btn-default color-blacked" href="#">
                              Start Exploring Now{" "}
                              <i className="fa-sharp fa-solid fa-arrow-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 mt_md--30 mt_sm--30">
                        <div className="export-img">
                          <div className="inner-without-padding">
                            <div className="export-img img-bg-shape">
                              <img
                                src="assets/images/generator-img/chat-export-photo.png"
                                alt="Chat example Image"
                              />
                              <div className="image-shape" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="text-generate"
                  role="tabpanel"
                  aria-labelledby="text-generator-tab"
                >
                  <div className="inner">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="section-title">
                          <h2 className="title">
                            Text generating AI refers to artificial
                            intelligence.
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Transformer Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Conditional Generative Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Pre-trained Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Variational Autoencoders
                              </li>
                            </ul>
                          </div>
                          <div className="read-more">
                            <a className="btn-default color-blacked" href="#">
                              Start Exploring Now{" "}
                              <i className="fa-sharp fa-solid fa-arrow-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 mt_md--30 mt_sm--30">
                        <div className="export-img">
                          <div className="inner-without-padding">
                            <div className="export-img img-bg-shape">
                              <img
                                src="assets/images/generator-img/chat-export.png"
                                alt="Chat example Image"
                              />
                              <div className="image-shape" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="code-generate"
                  role="tabpanel"
                  aria-labelledby="code-generator-tab"
                >
                  <div className="inner">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="section-title">
                          <h2 className="title">
                            Code generating AI refers to artificial
                            intelligence.
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Transformer Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Conditional Generative Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Pre-trained Models
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Variational Autoencoders
                              </li>
                            </ul>
                          </div>
                          <div className="read-more">
                            <a className="btn-default color-blacked" href="#">
                              Start Exploring Now{" "}
                              <i className="fa-sharp fa-solid fa-arrow-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 mt_md--30 mt_sm--30">
                        <div className="export-img">
                          <div className="inner-without-padding">
                            <div className="export-img img-bg-shape">
                              <img
                                src="assets/images/generator-img/chat-export-code.png"
                                alt="Chat example Image"
                              />
                              <div className="image-shape" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabArea;
