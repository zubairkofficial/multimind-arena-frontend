import React from "react";

const Slider = () => {
  return (
    <>
      <div
        className="slider-area slider-style-1 variation-default slider-bg-image bg-banner1 slider-bg-shape"
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
                  <b className="theme-gradient is-visible mx-5">AI Chating</b>
                  AI Hack
                </h1>
                <p className="description">
                  Unleash Brainwave's AI potential. Use the open AI <br />{" "}
                  conversation app Pixcels Themes
                </p>
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
        <div className="bg-shape">
          <img
            className="bg-shape-one"
            src="assets/images/bg/bg-shape-four.png"
            alt="Bg Shape"
          />
          <img
            className="bg-shape-two"
            src="assets/images/bg/bg-shape-five.png"
            alt="Bg Shape"
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
