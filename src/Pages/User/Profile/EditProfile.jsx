import React from "react";
import Header from "../Layout/Header";
import UserDashboard from "../Layout/Index";

const EditProfile = () => {
  return (
   <UserDashboard>
       <div className="rbt-main-content mb--0">
       <div className="rbt-daynamic-page-content center-width">
         {/* Dashboard Center Content */}
         <div className="rbt-dashboard-content">
           <div className="banner-area">
             {/* AiWavesmall Slider */}
             <div className="settings-area">
               <h3 className="title">Profile Details</h3>
               <ul className="user-nav">
                 <li>
                   <a href="profile-details.html">
                     <span>Profile Details</span>
                   </a>
                 </li>
                 <li>
                   <a href="notification.html">
                     <span>Notification</span>
                   </a>
                 </li>
                 <li>
                   <a href="chat-export.html">
                     <span>Chat Export</span>
                   </a>
                 </li>
                 <li>
                   <a href="appearance.html">
                     <span>Apperance</span>
                   </a>
                 </li>
                 <li>
                   <a href="plans-billing.html">
                     <span>Plans and Billing</span>
                   </a>
                 </li>
                 <li>
                   <a href="sessions.html">
                     <span>Sessions</span>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
           <div className="content-page pb--50">
             <div className="chat-box-list">
               {/* AiWaveSettings Settings */}
               <div className="single-settings-box profile-details-box overflow-hidden">
                 <div className="profile-details-tab">
                   <div className="advance-tab-button mb--30">
                     <ul
                       className="nav nav-tabs tab-button-style-2 justify-content-start"
                       id="settinsTab-4"
                       role="tablist"
                     >
                       <li role="presentation">
                         <a
                           href="#"
                           className="tab-button active"
                           id="profile-tab"
                           data-bs-toggle="tab"
                           data-bs-target="#profile"
                           role="tab"
                           aria-controls="profile"
                           aria-selected="true"
                         >
                           <span className="title">Profile</span>
                         </a>
                       </li>
                       <li role="presentation">
                         <a
                           href="#"
                           className="tab-button"
                           id="password-tab"
                           data-bs-toggle="tab"
                           data-bs-target="#password"
                           role="tab"
                           aria-controls="password"
                           aria-selected="false"
                         >
                           <span className="title">Password</span>
                         </a>
                       </li>
                       <li role="presentation">
                         <a
                           href="#"
                           className="tab-button"
                           id="del-account-tab"
                           data-bs-toggle="tab"
                           data-bs-target="#delaccount"
                           role="tab"
                           aria-controls="delaccount"
                           aria-selected="false"
                         >
                           <span className="title">Delete Account</span>
                         </a>
                       </li>
                     </ul>
                   </div>
                   <div className="tab-content">
                     <div
                       className="tab-pane fade active show"
                       id="profile"
                       role="tabpanel"
                       aria-labelledby="profile-tab"
                     >
                       {/* Start Profile Row  */}
                       <form
                         action="#"
                         className="rbt-profile-row rbt-default-form row row--15"
                       >
                         <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                           <div className="form-group">
                             <label htmlFor="firstname">First Name</label>
                             <input
                               id="firstname"
                               type="text"
                               placeholder="Trent"
                             />
                           </div>
                         </div>
                         <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                           <div className="form-group">
                             <label htmlFor="lastname">Last Name</label>
                             <input
                               id="lastname"
                               type="text"
                               placeholder="Adam"
                             />
                           </div>
                         </div>
                         <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                           <div className="form-group">
                             <label htmlFor="username">User Name</label>
                             <input
                               id="username"
                               type="text"
                               placeholder="Adam Milner"
                             />
                           </div>
                         </div>
                         <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                           <div className="form-group">
                             <label htmlFor="phonenumber">
                               Phone Number
                             </label>
                             <input
                               id="phonenumber"
                               type="tel"
                               placeholder="+1-202-555-0174"
                             />
                           </div>
                         </div>
                         <div className="col-12">
                           <div className="form-group">
                             <label htmlFor="bio">Bio</label>
                             <textarea
                               id="bio"
                               cols={20}
                               rows={5}
                               placeholder="I'm the Front-End Developer for #Pixcels IT in Bangladesh, OR. I have serious passion for UI effects, animations and creating intuitive, dynamic user experienc"
                               defaultValue={""}
                             />
                           </div>
                         </div>
                         <div className="col-12 mt--20">
                           <div className="form-group mb--0">
                             <a className="btn-default" href="#">
                               Update Info
                             </a>
                           </div>
                         </div>
                       </form>
                       {/* End Profile Row  */}
                     </div>
                     <div
                       className="tab-pane fade"
                       id="password"
                       role="tabpanel"
                       aria-labelledby="password-tab"
                     >
                       {/* Start Profile Row  */}
                       <form
                         action="#"
                         className="rbt-profile-row rbt-default-form row row--15"
                       >
                         <div className="col-12">
                           <div className="form-group">
                             <label htmlFor="currentpassword">
                               Current Password
                             </label>
                             <input
                               id="currentpassword"
                               type="password"
                               placeholder="Current Password"
                             />
                           </div>
                         </div>
                         <div className="col-12">
                           <div className="form-group">
                             <label htmlFor="newpassword">
                               New Password
                             </label>
                             <input
                               id="newpassword"
                               type="password"
                               placeholder="New Password"
                             />
                           </div>
                         </div>
                         <div className="col-12">
                           <div className="form-group">
                             <label htmlFor="retypenewpassword">
                               Re-type New Password
                             </label>
                             <input
                               id="retypenewpassword"
                               type="password"
                               placeholder="Re-type New Password"
                             />
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
                       {/* End Profile Row  */}
                     </div>
                     <div
                       className="tab-pane fade"
                       id="delaccount"
                       role="tabpanel"
                       aria-labelledby="del-account-tab"
                     >
                       {/* Start Profile Row  */}
                       <form
                         action="#"
                         className="rbt-profile-row rbt-default-form row row--15"
                       >
                         <div className="col-11 text-Center">
                           <p className="mb--20">
                             {" "}
                             <strong>Warning: </strong>Deleting your account
                             will permanently erase all your data and cannot
                             be reversed. This includes your profile,
                             conversations, comments, and any other info
                             linked to your account. Are you sure you want to
                             go ahead with deleting your account? Enter your
                             password to confirm.
                           </p>
                         </div>
                         <div className="col-12">
                           <div className="form-group">
                             <label htmlFor="enterpassword">
                               Your Password
                             </label>
                             <input
                               id="enterpassword"
                               type="password"
                               placeholder="Current Password"
                             />
                           </div>
                         </div>
                         <div className="col-12 mt--20">
                           <div className="form-group mb--0">
                             <a className="btn-default" href="#">
                               <i className="fa-solid fa-trash-can" /> Delete
                               Accont
                             </a>
                           </div>
                         </div>
                       </form>
                       {/* End Profile Row  */}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
    </UserDashboard>
  );
};

export default EditProfile;
