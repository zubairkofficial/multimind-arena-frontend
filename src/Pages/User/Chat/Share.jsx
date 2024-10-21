import React from 'react'

const Share = () => {
  return (
    <div
    id="shareModal"
    className="modal rbt-modal-box share-modal fade"
    tabIndex={-1}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content wrapper modal-small">
        <h5 className="title">Share</h5>
        <ul className="social-icon social-default transparent-with-border mb--20">
          <li
            data-sal="slide-up"
            data-sal-duration={400}
            data-sal-delay={200}
          >
            <a href="https://www.facebook.com/">
              <i className="fa-brands fa-facebook-f" />
            </a>
          </li>
          <li
            data-sal="slide-up"
            data-sal-duration={400}
            data-sal-delay={300}
          >
            <a href="https://www.twitter.com/">
              <i className="fa-brands fa-twitter" />
            </a>
          </li>
          <li
            data-sal="slide-up"
            data-sal-duration={400}
            data-sal-delay={400}
          >
            <a href="https://www.instagram.com/">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
          <li
            data-sal="slide-up"
            data-sal-duration={400}
            data-sal-delay={500}
          >
            <a href="https://www.linkdin.com/">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </li>
        </ul>
        <div className="chat-form">
          <div className="text-form d-flex align-items-center">
            <input
              type="text"
              className="copy-link-input"
              defaultValue="https://www.youtube.com/"
              readOnly=""
            />
            <button className="btn-default bg-solid-primary" type="submit">
              Copy
            </button>
          </div>
        </div>
        <button className="close-button" data-bs-dismiss="modal">
          <i className="fa-sharp fa-regular fa-x" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Share