import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import Copyright from "./Copyright";
import Preloader from "./Preloader";
import Slider from "./Slider";
import Testimonial from "./Testimonial";
import Service from "./Service";
import AdvancedTab from "./AdvancedTab";
import Pricing from "./Pricing";
import BrandArea from "./BrandArea";
import TabArea from "./TabArea";

const Index = () => {
  return (
    <>
      <>
        <main className="page-wrapper">
          {/* Start Header Top Area  */}
          <Header />
          {/* Imroz Preloader */}
          {/* <Preloader/> */}
          {/* Start Slider Area  */}
          <Slider />
          {/* End Slider Area  */}
          {/* Start Brand Area */}
          <BrandArea />
          {/* Start Tab__Style--one Area  */}
          <TabArea />
          {/* End Tab__Style--one Area  */}
          {/* Start Service__Style--one Area  */}
          {/* End Service__Style--one Area  */}
          {/* Start Advanced Tab area */}
          <AdvancedTab />
          {/* End Advanced Tab Area */}
          {/* Start Collabration-Style-One  */}

          {/* End Collabration-Style-One  */}
          {/* Start CTA Style-one Area  */}
          <div className="rainbow-rn-cta">
            <div className="container">
              <div className="row row--0 align-items-center content-wrapper">
                <div className="col-lg-8">
                  <div className="inner">
                    <div className="content text-left">
                      <h4
                        className="title sal-animate"
                        data-sal="slide-up"
                        data-sal-duration={400}
                        data-sal-delay={200}
                      >
                        Join our aI Experts community
                      </h4>
                      <p
                        className="sal-animate"
                        data-sal="slide-up"
                        data-sal-duration={400}
                        data-sal-delay={300}
                      >
                        Meet and learn from 80+ creators &amp; companies who
                        share how thay use AI to create better content at
                        lightning speed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="right-content">
                    <div
                      className="call-to-btn text-start text-lg-end sal-animate"
                      data-sal="slide-up"
                      data-sal-duration={400}
                      data-sal-delay={400}
                    >
                      <div className="team-image">
                        <img
                          src="assets/images/cta-img/team-01.png"
                          alt="Group Image"
                        />
                      </div>
                      <a className="btn-default" href="#">
                        Join Now Today Free
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-shape">
                  <img
                    src="assets/images/cta-img/bg-shape-01.png"
                    alt="BG Shape"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End CTA Style-one Area  */}
          {/* Pricing Part */}
          <Pricing />
          {/* Service Area */}
          <Service />
          {/* Start Testimonial Area  */}
          <Testimonial />
          {/* End Testimonial Area  */}

          {/* Start Footer Area  */}
          <Footer />
          {/* End Footer Area  */}
          {/* Start Copy Right Area  */}
          <Copyright />
          {/* End Copy Right Area  */}
        </main>
      </>
    </>
  );
};

export default Index;
