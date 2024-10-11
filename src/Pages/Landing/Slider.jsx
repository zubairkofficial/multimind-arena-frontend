import React, { useEffect, useState } from "react";

const Slider = () => {
  const [text, setText] = useState("AI Chating");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setText((prevText) => (prevText === "AI Chating" ? "AI Writing" : "AI Chating"));
        setIsFading(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fadeInOutStyles = {
    opacity: isFading ? 0 : 1,
    transition: "opacity 0.5s ease-in-out",
  };

  return (
    <>
      <div
        className="slider-area slider-style-1 variation-default  bg-banner1 slider-bg-shape"
        data-black-overlay={1}
      >
        {/* <div class="bg-blend-top bg_dot-mask"></div> */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="inner text-center mt--140">
                <h1 className="title display-one">
                  Examine the Potential of
                  <br />{" "}
                  <b className="theme-gradient is-visible mx-5" style={fadeInOutStyles}>{text}</b>
                  AI Hack
                </h1>
                <h6 className="description">
                  Unleash Brainwave's AI potential. Use the open AI <br />{" "}
                  conversation app Pixcels Themes
                </h6>
                <div className="form-group">
                  <textarea
                    name="text"
                    id="slider-text-area"
                    cols={30}
                    rows={2}
                    placeholder="Enter a prompt, for example: a fundraising deck to a mobile finance app called Intuitive"
                    defaultValue={""}
                  />
                  <a
                    className="btn-default @@btnClass"
                    href="text-generator.html"
                  >
                    Start with AI
                  </a>
                </div>
                <div className="inner-shape">
                  <img
                    src="assets/images/bg/icon-shape/icon-shape-one.png"
                    alt="Icon Shape"
                    className="iconshape iconshape-one"
                  />
                  <img
                    src="assets/images/bg/icon-shape/icon-shape-two.png"
                    alt="Icon Shape"
                    className="iconshape iconshape-two"
                  />
                  <img
                    src="assets/images/bg/icon-shape/icon-shape-three.png"
                    alt="Icon Shape"
                    className="iconshape iconshape-three"
                  />
                  <img
                    src="assets/images/bg/icon-shape/icon-shape-four.png"
                    alt="Icon Shape"
                    className="iconshape iconshape-four"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-11 col-xl-11 justify-content-center">
              <div className="slider-frame">
                <img
                  className="slider-image-effect"
                  src="assets/images/bg/slider-main-image.png"
                  alt="Banner Images"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;