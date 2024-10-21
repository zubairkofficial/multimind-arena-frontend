import React from 'react'

const Dislike = () => {
  return (
    <div
    id="dislikeModal"
    className="modal rbt-modal-box dislike-modal fade"
    tabIndex={-1}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content wrapper">
        <h5 className="title">Why do you like this response?</h5>
        <select
          className="form-select"
          multiple=""
          aria-label="multiple select example"
        >
          <option selected="">Irrelevant</option>
          <option value={2}>Offensive</option>
          <option value={3}>Not Correct</option>
        </select>
        <div className="chat-form">
          <h6 className="title">Provide your feedback</h6>
          <div className="text-form">
            <textarea
              rows={6}
              placeholder="Send a message..."
              defaultValue={""}
            />
          </div>
        </div>
        <div className="bottom-btn mt--20">
          <a className="btn-default btn-small round" href="#">
            Send Feedback
          </a>
        </div>
        <button className="close-button" data-bs-dismiss="modal">
          <i className="fa-sharp fa-regular fa-x" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Dislike