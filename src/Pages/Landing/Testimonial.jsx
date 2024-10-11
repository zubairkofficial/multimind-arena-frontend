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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const slideStyle = {
    padding: '0 10px',
  };

  const sliderContainerStyle = {
    margin: '0 -10px',
  };

  const ratingStyle = {
    display: 'flex',
    marginBottom: '10px',
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
  };

  const imageStyle = {
    width: '80px',
    height: 'auto',
    marginRight: '10px',
  };

  const videoButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div style={{ marginBottom: '60px' }}>
              <h4 style={{ color: '#FF8A00', fontSize: '24px' }}>
                Assisting individuals
              </h4>
              <h2 style={{ fontSize: '32px' }}>The opinions of the community</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Slider {...settings} style={sliderContainerStyle}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} style={slideStyle}>
                  <div style={cardStyle}>
                    <div style={ratingStyle}>
                      {[...Array(5)].map((_, i) => (
                        <a key={i} href="#rating">
                          <i className="fa-sharp fa-solid fa-star" />
                        </a>
                      ))}
                    </div>
                    <div>
                      <p style={{ marginBottom: '20px' }}>{testimonial.description}</p>
                    </div>
                    <div style={bottomContentStyle}>
                      <div style={metaInfoStyle}>
                        <div>
                          <p style={{ marginBottom: '5px' }}>{testimonial.name}</p>
                          <p style={{ marginBottom: '0px' }}>{testimonial.position}</p>
                        </div>
                        <img
                          src={testimonial.brandImg}
                          alt="Brand Image"
                          style={imageStyle}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
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
                            style={{ width: '80px', height: 'auto' }}
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
