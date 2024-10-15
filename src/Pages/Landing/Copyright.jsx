import React from 'react'

const Copyright = () => {
  return (
    <>
         <div className="copyright-area copyright-style-one">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                  <div className="copyright-left">
                    <ul className="ft-menu link-hover">
                      <li>
                        <a href="privacy-policy.html">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="terms-policy.html">Terms And Condition</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-12 col-12">
                  <div className="copyright-right text-center text-lg-end">
                    <p className="copyright-text">
                    © 2024 All rights reserved. {" "}
                      <a
                        href="https://multimind-arena.cyberifyportfolio.com"
                        target ='_blank_'
                        className="btn-read-more"
                      >
                        <span> MultiMind Arena</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Copyright