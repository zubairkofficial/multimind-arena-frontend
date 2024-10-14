import React from "react";
import Slider from "react-slick"; // Import react-slick for the slider

const testimonials = [
  {
    id: 1,
    name: "Guy Hawkins",
    position: "Nursing Assistant",
    description:
      "Pixcels-Themes has become such an integral part of our work! By putting our",
    img: "assets/images/team/team-02sm.jpg",
    video: "https://www.youtube.com/watch?v=ikEdN260zRg",
    brandImg: "assets/images/brand/brand-t.png",
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "Software Engineer",
    description: "This is another amazing testimonial.",
    img: "assets/images/team/team-02sm.jpg",
    video: "https://www.youtube.com/watch?v=ikEdN260zRg",
    brandImg: "assets/images/brand/brand-t.png",
  },
  {
    id: 3,
    name: "Guy Hawkins",
    position: "Nursing Assistant",
    description:
      "Pixcels-Themes has become such an integral part of our work! By putting our",
    img: "assets/images/team/team-02sm.jpg",
    video: "https://www.youtube.com/watch?v=ikEdN260zRg",
    brandImg: "assets/images/brand/brand-t.png",
  },
  {
    id: 4,
    name: "Jane Doe",
    position: "Software Engineer",
    description: "This is another amazing testimonial.",
    img: "assets/images/team/team-02sm.jpg",
    video: "https://www.youtube.com/watch?v=ikEdN260zRg",
    brandImg: "assets/images/brand/brand-t.png",
  },
];

const Testimonial = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const cardStyle = {
    height: '350px',
    display: 'flex',
    margin: '15px 15px 15px 15px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    boxSizing: 'border-box',
    border: '2px solid #00ff00',
    borderRadius: '15px',
    backgroundColor: '#003300',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.3s',
  };

  const slideStyle = {
    padding: '0 25px',
  };

  const sliderContainerStyle = {
    margin: '0 -25px',
  };

  const ratingStyle = {
    display: 'flex',
    marginBottom: '15px',
    color: '#00ff00',
  };

  const bottomContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
  };

  const metaInfoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  };

  const imageStyle = {
    width: '70px',
    height: 'auto',
    marginRight: '15px',
    borderRadius: '50%',
    border: '2px solid #00ff00',
  };

  const videoButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '15px',
    color: '#00ff00',
    fontSize: '24px',
  };

  const descriptionStyle = {
    marginBottom: '20px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#e0ffe0',
  };

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#000000' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
              <h4 style={{ color: '#00ff00', fontSize: '28px', marginBottom: '10px' }}>
                Assisting individuals
              </h4>
              <h2 style={{ fontSize: '36px', color: '#e0ffe0' }}>The opinions of the community</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Slider {...settings} style={sliderContainerStyle}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} style={slideStyle}>
                  <div
                    style={cardStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={ratingStyle}>
                      {[...Array(5)].map((_, i) => (
                        <a key={i} href="#rating">
                          <i className="fa-sharp fa-solid fa-star" />
                        </a>
                      ))}
                    </div>
                    <div>
                      <p style={descriptionStyle}>{testimonial.description}</p>
                    </div>
                    <div style={bottomContentStyle}>
                      <div style={metaInfoStyle}>
                        <div>
                          <p style={{ marginBottom: '5px', fontWeight: 'bold', color: '#e0ffe0' }}>{testimonial.name}</p>
                          <p style={{ marginBottom: '0px', color: '#00ff00' }}>{testimonial.position}</p>
                        </div>
                        <img
                          src={testimonial.brandImg}
                          alt="Brand Image"
                          style={imageStyle}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <a
                          href={testimonial.video}
                          style={videoButtonStyle}
                        >
                          <i className="fa-duotone fa-play" />
                        </a>
                        <a href="#">
                          <img
                            src={testimonial.img}
                            alt="Team Image"
                            style={{ width: '70px', height: 'auto', borderRadius: '10px', border: '2px solid #00ff00' }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;