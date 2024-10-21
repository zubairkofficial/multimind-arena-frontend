import React from 'react'

const Like = () => {
  return (
    <div
    id="likeModal"
    className="modal rbt-modal-box like-modal fade"
    tabIndex={-1}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content wrapper">
        <h5 className="title">Provide additional feedback</h5>
        <div className="chat-form">
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

export default Like