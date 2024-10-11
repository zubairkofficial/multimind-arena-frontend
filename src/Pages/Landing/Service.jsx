import React from "react";

const serviceData = [
  {
    icon: "assets/images/service/service-icon-01.png",
    title: "100% No-Risk, Money Back Guarantee!",
    description:
      "Refunds will be issued within a period of 14 days from the purchase date",
  },
  {
    icon: "assets/images/service/service-icon-02.png",
    title: "Upgrade or Cancel Anytime",
    description: "Passages there are many variations of Lorem Ipsum available.",
  },
  {
    icon: "assets/images/service/service-icon-03.png",
    title: "Not sure yet, try the free version",
    description:
      "Refunds will be issued within a period of 14 days from the purchase date",
  },
];

const Service = () => {
  return (
    <>
      <div className="aiwave-service-area rainbow-section-gap">
        <div className="container">
          <div className="row row--15 service-wrapper">
            {serviceData.map((service, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate service-item mb-4"
                data-sal="slide-up"
                data-sal-duration={700}
                data-sal-delay={index * 100}
              >
                <div className="service service__style--1 aiwave-style text-center">
                  <div className="icon service-icon">
                    <img src={service.icon} alt="Service Image" />
                  </div>
                  <div className="content">
                    <h4 className="title w-600">{service.title}</h4>
                    <p className="description b1 mb--0">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .service-item {
          display: flex;
          gap: 4rem;
          border: 2px solid #00ff00;
          padding: 20px;
          border-radius: 10px;
          border-width: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 30px;
        }
        .service-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 85, 0, 0.3);
        }
      `}</style>
    </>
  );
};

export default Service;
