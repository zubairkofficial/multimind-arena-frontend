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
            ></div>
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
                        src="assets/images/icons/scientific.png"
                        alt="Vedio Generator Icon"
                      />
                      Scientific
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
                        src="assets/images/icons/historical.png"
                        alt="Vedio Generator Icon"
                      />
                      Historical
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
                        src="assets/images/icons/philosophy.png"
                        alt="Vedio Generator Icon"
                      />
                      Philosophy
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
                        src="assets/images/icons/literary-minds.png"
                        alt="Vedio Generator Icon"
                      />
                      Literary Minds
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
                            Fusion Frontiers: Pioneering Science with People and
                            AI
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Blending Human Insight with AI Innovation for
                                Breakthrough Ideas
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Evolving Minds: Shaping Tomorrow with Human-AI
                                Debates
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Mind and Machine: Conversations Beyond
                                Boundaries
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Explore the future of science through
                                collaborative discussions
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
                                src="assets/images/bg/slider-main-image.png"
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
                            Dive Into History – Trivia, Debates, and AI Insights
                            Await!
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Relive key historical moments through engaging
                                discussions
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Debate pivotal events with fellow history
                                enthusiasts and AI
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Connect past with the present to understand
                                today’s world
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Participate in history quizzes and uncover
                                hidden gems
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
                                src="assets/images/bg/slider-main-image.png"
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
                            Engage, Explore, Evolve: Philosophy with Humans and
                            AI
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Deep Conversations: Human and AI Philosophical
                                Exchange
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Where Curiosity Meets Understanding
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Explore life’s biggest questions with AI and
                                thinkers
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Challenge your beliefs and expand your thinking
                                in debates
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
                                src="assets/images/bg/slider-main-image.png"
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
                            Where Human Imagination Meets Digital Insight.
                          </h2>
                          <div className="features-section">
                            <ul className="list-style--1">
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Where Readers and AI Collide
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Human Hearts, AI Minds
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />A
                                Literary Trinity
                              </li>
                              <li>
                                <i className="fa-regular fa-circle-check" />
                                Humans, Books, and Bytes
                              </li>
                            </ul>
                          </div>
                          <div className="read-more">
                            <a className="btn-default color-blacked" href="#">
                              Exploring Literature Together{" "}
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
                                src="assets/images/bg/slider-main-image.png"
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
                                src="assets/images/bg/slider-main-image.png"
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
