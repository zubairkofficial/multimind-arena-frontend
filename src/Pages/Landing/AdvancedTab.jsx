import React from "react";
import {Link} from 'react-router-dom'
const AdvancedTab = () => {
  return (
    <>
      <div className="rainbow-advance-tab-area aiwave-bg-gradient rainbow-section-gap-big">
        <div className="container">
          <div className="html-tabs" data-tabs="true">
            <div className="row row--30">
              <div className="col-lg-12">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active advance-tab-content-1 right-top"
                    id="home-3"
                    role="tabpanel"
                    aria-labelledby="home-tab-3"
                  >
                    <div className="rainbow-splite-style">
                      <div className="split-wrapper">
                        <div className="row g-0 radius-10 align-items-center">
                          <div className="col-lg-12 col-xl-5 col-12">
                            <div className="thumbnail">
                              <img
                                className="radius"
                                src="assets/images/split/split-1.png"
                                alt="split Images"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-xl-7 col-12">
                            <div className="split-inner">
                              <div className="subtitle">
                                <span className="theme-gradient">
                                  How it work
                                </span>
                              </div>
                              <h2
                                className="title sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={200}
                              >
                                Join Multimind Chat Arena Today – Your Gateway
                                to Dynamic Conversations
                              </h2>
                              <p
                                className="description sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={300}
                              >
                                Unlock the world of interactive chat arenas with
                                just one click. Register now to customize your
                                experience, connect with real people, and engage
                                with AI-powered discussions designed to expand
                                your mind.
                              </p>
                              <div
                                className="view-more-button mt--35 sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={400}
                              >
                                <a
                                  className="btn-default color-blacked"
                                  href="/login"
                                >
                                  Try It Now{" "}
                                  <i className="fa-sharp fa-light fa-arrow-right ml--5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade advance-tab-content-1"
                    id="profile-3"
                    role="tabpanel"
                    aria-labelledby="profile-tab-3"
                  >
                    <div className="rainbow-splite-style">
                      <div className="split-wrapper">
                        <div className="row g-0 radius-10 align-items-center">
                          <div className="col-lg-12 col-xl-5 col-12">
                            <div className="thumbnail">
                              <img
                                className="radius"
                                src="assets/images/split/split-4.png"
                                alt="split Images"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-xl-7 col-12">
                            <div className="split-inner">
                              <div className="subtitle">
                                <span className="theme-gradient">
                                  Explore a Universe of Chat Arenas 
                                </span>
                              </div>
                              <h2
                                className="title sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={200}
                              >
                                Endless Conversations Await
                              </h2>
                              <p
                                className="description sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={300}
                              >
                                Dive into a variety of themed arenas where every
                                topic is an opportunity for discovery. Whether
                                you're into tech, creativity, or casual talk,
                                there's an arena tailored just for you. AI
                                companions and live participants make it more
                                engaging.
                              </p>
                              <div
                                className="view-more-button mt--35 sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={400}
                              >
                                <Link
                                  className="btn-default color-blacked"
                                  to="/login"
                                >
                                  Try It Now{" "}
                                  <i className="fa-sharp fa-light fa-arrow-right ml--5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade advance-tab-content-1"
                    id="contact-3"
                    role="tabpanel"
                    aria-labelledby="contact-tab-3"
                  >
                    <div className="rainbow-splite-style">
                      <div className="split-wrapper">
                        <div className="row g-0 radius-10 align-items-center">
                          <div className="col-lg-12 col-xl-5 col-12">
                            <div className="thumbnail">
                              <img
                                className="radius"
                                src="assets/images/split/split-3.png"
                                alt="split Images"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-xl-7 col-12">
                            <div className="split-inner">
                              <div className="subtitle">
                                <span className="theme-gradient">
                                  Enter the Arena
                                </span>
                              </div>
                              <h2
                                className="title sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={200}
                              >
                                Where Minds Meet and Ideas Spark
                              </h2>
                              <p
                                className="description sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={300}
                              >
                                Step into the chat arena and immerse yourself in
                                lively discussions. Whether you're here to
                                learn, share, or simply have fun, joining an
                                arena gives you access to a dynamic environment
                                filled with people and AI ready to interact.
                              </p>
                              <div
                                className="view-more-button mt--35 sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={400}
                              >
                                <Link
                                  className="btn-default color-blacked"
                                  to="/login"
                                >
                                  Try It Now{" "}
                                  <i className="fa-sharp fa-light fa-arrow-right ml--5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade advance-tab-content-1"
                    id="explore-3"
                    role="tabpanel"
                    aria-labelledby="explore-tab-3"
                  >
                    <div className="rainbow-splite-style">
                      <div className="split-wrapper">
                        <div className="row g-0 radius-10 align-items-center">
                          <div className="col-lg-12 col-xl-5 col-12">
                            <div className="thumbnail">
                              <img
                                className="radius"
                                src="assets/images/split/split-5.png"
                                alt="split Images"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-xl-7 col-12">
                            <div className="split-inner">
                              <div className="subtitle">
                                <span className="theme-gradient">
                                  Converse Freely
                                </span>
                              </div>
                              <h2
                                className="title sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={200}
                              >
                                Engage with AI and People Like Never Befores
                              </h2>
                              <p
                                className="description sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={300}
                              >
                                From casual chats to deep discussions, connect
                                with like-minded individuals or challenge AI in
                                stimulating exchanges. Your voice matters in
                                every conversation, whether it’s one-on-one or
                                in group interactions.
                              </p>
                              <div
                                className="view-more-button mt--35 sal-animate"
                                data-sal="slide-up"
                                data-sal-duration={400}
                                data-sal-delay={400}
                              >
                                <a
                                  className="btn-default color-blacked"
                                  href="contact.html"
                                >
                                  Try It Now{" "}
                                  <i className="fa-sharp fa-light fa-arrow-right ml--5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mt--60">
                <div className="advance-tab-button advance-tab-button-1 right-top">
                  <ul
                    className="nav nav-tabs tab-button-list"
                    id="myTab-3"
                    role="tablist"
                  >
                    <li className="col-lg-3 nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link tab-button active"
                        id="home-tab-3"
                        data-bs-toggle="tab"
                        data-bs-target="#home-3"
                        role="tab"
                        aria-controls="home-3"
                        aria-selected="true"
                      >
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">01</span>
                          </div>
                          <h4 className="title">Register </h4>
                        </div>
                      </a>
                    </li>
                    <li className="col-lg-3 nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link tab-button"
                        id="profile-tab-3"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-3"
                        role="tab"
                        aria-controls="profile-3"
                        aria-selected="false"
                      >
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">02</span>
                          </div>
                          <h4 className="title">Browse Different Arenas</h4>
                        </div>
                      </a>
                    </li>
                    <li className="col-lg-3 nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link tab-button"
                        id="contact-tab-3"
                        data-bs-toggle="tab"
                        data-bs-target="#contact-3"
                        role="tab"
                        aria-controls="contact-3"
                        aria-selected="false"
                      >
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">03</span>
                          </div>
                          <h4 className="title">Join Arena</h4>
                        </div>
                      </a>
                    </li>
                    <li className="col-lg-3 nav-item" role="presentation">
                      <a
                        href="#"
                        className="nav-link tab-button"
                        id="explore-tab-3"
                        data-bs-toggle="tab"
                        data-bs-target="#explore-3"
                        role="tab"
                        aria-controls="explore-3"
                        aria-selected="false"
                      >
                        <div className="tab">
                          <div className="count-text">
                            <span className="theme-gradient">04</span>
                          </div>
                          <h4 className="title">Chat</h4>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-shape">
          <img src="assets/images/bg/split-bg-shape.png" alt="Bg Shape" />
        </div>
      </div>
    </>
  );
};

export default AdvancedTab;
