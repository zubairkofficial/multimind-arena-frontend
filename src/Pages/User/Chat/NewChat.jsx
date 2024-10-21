import React from 'react'

const NewChat = () => {
  return (
    <div
      id="newchatModal"
      className="modal rbt-modal-box copy-modal fade"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content wrapper">
          <div
            className="section-title text-center mb--30 sal-animate"
            data-sal="slide-up"
            data-sal-duration={400}
            data-sal-delay={150}
          >
            <h3 className="title mb--0 w-600">Unlock the power of AI</h3>
          </div>
          <div className="genarator-section">
            <ul className="genarator-card-group">
              <li>
                <a href="text-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/text.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Text Generator</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="image-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/photo.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Image Generator</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="image-editor.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/photo.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Photo Editor</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="code-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/code-editor.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Code Generator</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="text-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/text-voice.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Text to speech</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="text-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/voice.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Speech to text</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="vedio-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/video-camera.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Vedio Generator</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="genarator-card disabled" tabIndex={-1}>
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/website-design.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Website Generator</h5>
                    </div>
                    <div className="right-align">
                      <span className="rainbow-badge-card">Coming</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="code-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/code-editor.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">HTML Generator</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="text-generator.html"
                  className="genarator-card disabled"
                  tabIndex={-1}
                >
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/document.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Chat with Documents</h5>
                    </div>
                    <div className="right-align">
                      <span className="rainbow-badge-card">Coming</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="email-generator.html" className="genarator-card">
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/email.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Email Writer</h5>
                    </div>
                    <div className="right-align">
                      <div className="icon-bar">
                        <i className="fa-sharp fa-solid fa-arrow-right" />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="genarator-card disabled" tabIndex={-1}>
                  <div className="inner">
                    <div className="left-align">
                      <div className="img-bar">
                        <img
                          src="assets/images/generator-icon/lyrics.png"
                          alt="AI Generator"
                        />
                      </div>
                      <h5 className="title">Lyrics Generator</h5>
                    </div>
                    <div className="right-align">
                      <span className="rainbow-badge-card">Coming</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <button className="close-button" data-bs-dismiss="modal">
            <i className="fa-sharp fa-regular fa-x" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewChat