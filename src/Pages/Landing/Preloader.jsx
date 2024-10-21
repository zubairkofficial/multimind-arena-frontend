import React from 'react'

const Preloader = () => {
  return (
    <>
       {/* <div className="preloader">
            <div className="loader">
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
            </div>
          </div> */}
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <div className="spinner-border text-success " style={{width: "5rem", height: "5rem"}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

   

    </>
  )
}

export default Preloader