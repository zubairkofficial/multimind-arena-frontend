import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-dark text-white">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
        <p className="lead">
          The page you’re looking for doesn’t exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
