import React from 'react'

const Banner = () => {
  return (
    <div className="rainbow-rn-cta m-8">
    <div className="container ">
      <div className="row row--0 align-items-center content-wrapper "
      style={{
        marginTop: '100px',
        marginBottom: '50px'
      }}>
        <div className="col-lg-8">
          <div className="inner">
            <div className="content text-left">
              <h4
                className="title sal-animate"
                data-sal="slide-up"
                data-sal-duration={400}
                data-sal-delay={200}
              >
                Join our Chat Arenas Now.
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
                  src="assets/images/cta-img/chat.png"
                  alt="Group Image"
                  style={{
                    height: "100px",
                  }}
                />
              </div>
              <a className="btn-default" href="#">
                Join Now Today Free
              </a>
            </div>
          </div>
        </div>
        <div className="bg-shape">

        </div>
      </div>
    </div>
  </div>
  )
}

export default Banner