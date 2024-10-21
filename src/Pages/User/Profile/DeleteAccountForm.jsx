import React from "react";

const DeleteAccountForm = () => (
  <div
    className="tab-pane fade"
    id="delaccount"
    role="tabpanel"
    aria-labelledby="del-account-tab"
  >
    <form
      action="#"
      className="rbt-profile-row rbt-default-form row row--15"
    >
      <div className="col-11 text-center">
        <p className="mb--20">
          <strong>Warning: </strong>Deleting your account will permanently erase all your data and cannot be reversed. This includes your profile, conversations, comments, and any other info linked to your account. Are you sure you want to go ahead with deleting your account? Enter your password to confirm.
        </p>
      </div>
      <div className="col-12">
        <div className="form-group">
          <label htmlFor="enterpassword">Your Password</label>
          <input id="enterpassword" type="password" placeholder="Current Password" />
        </div>
      </div>
      <div className="col-12 mt--20">
        <div className="form-group mb--0">
          <a className="btn-default" href="#">
            <i className="fa-solid fa-trash-can" /> Delete Account
          </a>
        </div>
      </div>
    </form>
  </div>
);

export default DeleteAccountForm;
