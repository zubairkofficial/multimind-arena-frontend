import React from "react";

const serviceData = [
  {
    icon: "assets/images/icons/active-arenas.png",
    title: "Active Arenas",
    description:
      "42 Arenas",
  },
  {
    icon: "assets/images/icons/online-players.png",
    title: "Online Players",
    description: "1,337+ Players",
  },
  {
    icon: "/assets/images/icons/ai-figures.png",
    title: "AI Figures",
    description:
      "100+ AI Figures",
  },
];

const Service = () => {
  return (
    <>
      <div className="aiwave-service-area rainbow-section-gap">
        <div className="container ">
          <div className="row row--15 service-wrapper d-flex justify-content-around ">
            
            {serviceData.map((service, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-12 sal-animate service-item mb-4"
                data-sal="slide-up"
                data-sal-duration={700}
                data-sal-delay={index * 100}
              >
                <div className="service service__style--1 style-aiwave text-center bg-black">
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
          justify-content:space-around;
          gap: 2rem;
          padding: 20px;
          border-radius: 10px;
          border-width: 2px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 30px;
          // margin-left: 5px;
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
