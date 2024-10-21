import React from "react";
import Slider from "react-slick"; // Import react-slick for the slider

const testimonials = [
  {
    id: 1,
    name: "Guy Hawkins",
    position: "Nursing Assistant dsld",
    description:
      "Pixcels-Themes has become such an sdfsfw integral part of our work! By putting our",
    img: "assets/images/team/team-02sm.jpg",
    video: "https://www.youtube.com/watch?v=ikEdN260zRg",
    brandImg: "assets/images/brand/brand-t.png",
  },
  // {
  //   id: 2,
  //   name: "Jane Doe",
  //   position: "Software Engineer",
  //   description: "This is another amazing testimonial.",
  //   img: "assets/images/team/team-02sm.jpg",
  //   video: "https://www.youtube.com/watch?v=ikEdN260zRg",
  //   brandImg: "assets/images/brand/brand-t.png",
  // },
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
    id: 1,
    name: "Guy Hawkins",
    position: "Nursing Assistant",
    description:
      "Pixcels-Themes has become such an integral part of our work! By putting our",
    img: "assets/images/team/team-02sm.jpg",
    video: "https://www.youtube.com/watch?v=ikEdN260zRg",
    brandImg: "assets/images/brand/brand-t.png",
  },
  // {
  //   id: 2,
  //   name: "Jane Doe",
  //   position: "Software Engineer",
  //   description: "This is another amazing testimonial.",
  //   img: "assets/images/team/team-02sm.jpg",
  //   video: "https://www.youtube.com/watch?v=ikEdN260zRg",
  //   brandImg: "assets/images/brand/brand-t.png",
  // },
  // Add more testimonials as needed
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

  return (
    <div className="rainbow-testimonial-area rainbow-section-gap m-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Slider
              {...settings}
              className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className=" h-25 slide-single-layout p-3 w-30">
                  <div className="rainbow-box-card card-style-default testimonial-style-defalt has-bg-shaped">
                    <div className="inner">
                      <div className="rating py-2">
                        {[...Array(5)].map((_, i) => (
                          <a key={i} href="#rating">
                            <i className="fa-sharp fa-solid fa-star"></i>
                          </a>
                        ))}
                      </div>
                      <div className="content">
                        <p className="description">{testimonial.description}</p>
                        <div className="bottom-content">
                          <div className="meta-info-section">
                            <p className="title-text">{testimonial.name}</p>
                            <p className="desc">{testimonial.position}</p>
                            <div className="desc-img">
                              <img
                                src={testimonial.brandImg}
                                alt="Brand Image"
                              />
                            </div>
                          </div>
                          <div className="meta-img-section">
                       
                            <a className="image" href="#">
                              <img src={testimonial.img} alt="Team Image" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-shape">
                      <img
                        src="assets/images/service/bg-testimonial.png"
                        alt=""
                        className="bg"
                      />
                      <img
                        src="assets/images/icons/bg-testimonial-hover.png"
                        alt=""
                        className="bg-hover"
                      />
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
