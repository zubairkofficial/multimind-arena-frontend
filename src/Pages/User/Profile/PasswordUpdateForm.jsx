import React from "react";

const PasswordUpdateForm = () => (
  <div
    className="tab-pane fade"
    id="password"
    role="tabpanel"
    aria-labelledby="password-tab"
  >
    <form
      action="#"
      className="rbt-profile-row rbt-default-form row row--15"
    >
      <div className="col-12">
        <div className="form-group">
          <label htmlFor="currentpassword">Current Password</label>
          <input id="currentpassword" type="password" placeholder="Current Password" />
        </div>
      </div>
      <div className="col-12">
        <div className="form-group">
          <label htmlFor="newpassword">New Password</label>
          <input id="newpassword" type="password" placeholder="New Password" />
        </div>
      </div>
      <div className="col-12">
        <div className="form-group">
          <label htmlFor="retypenewpassword">Re-type New Password</label>
          <input id="retypenewpassword" type="password" placeholder="Re-type New Password" />
        </div>
      </div>
      <div className="col-12 mt--20">
        <div className="form-group mb--0">
          <a className="btn-default" href="#">
            Update Password
          </a>
        </div>
      </div>
    </form>
  </div>
);

export default PasswordUpdateForm;
