import React from "react";

const Service = () => {
  return (
    <>
      <div className="aiwave-service-area rainbow-section-gap">
        <div className="container">
          <div className="row row--15 service-wrapper">
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
              data-sal="slide-up"
              data-sal-duration={700}
            >
              <div className="service service__style--1 aiwave-style text-center">
                <div className="icon">
                  <img
                    src="assets/images/service/service-icon-01.png"
                    alt="Servece Image"
                  />
                </div>
                <div className="content">
                  <h4 className="title w-600">
                    100% No-Risk, Money Back Guarantee!
                  </h4>
                  <p className="description b1 mb--0">
                    Refunds will be issued within period of 14 days from the
                    purchase date
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
              data-sal="slide-up"
              data-sal-duration={700}
              data-sal-delay={100}
            >
              <div className="service service__style--1 aiwave-style text-center">
                <div className="icon">
                  <img
                    src="assets/images/service/service-icon-02.png"
                    alt="Servece Image"
                  />
                </div>
                <div className="content">
                  <h4 className="title w-600">Upgrade or Cancel Anytime</h4>
                  <p className="description b1 mb--0">
                    Passages there are many variations variations of of Lorem
                    Ipsum available.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
              data-sal="slide-up"
              data-sal-duration={700}
              data-sal-delay={200}
            >
              <div className="service service__style--1 aiwave-style text-center">
                <div className="icon">
                  <img
                    src="assets/images/service/service-icon-03.png"
                    alt="Servece Image"
                  />
                </div>
                <div className="content">
                  <h4 className="title w-600">
                    Not sure yet, try the free version
                  </h4>
                  <p className="description b1 mb--0">
                    Refunds will be issued within period of 14 days from the
                    purchase date
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
