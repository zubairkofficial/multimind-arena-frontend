import React, { useState } from "react";
import "./searchbar.css";

const Searchbar = ({
  heading,
  onClick,
  title,
  placeholder,
  onSearch,
  style,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  return (
    <header className="searchbar-header mx-4">
      <div className="row align-items-center mt-3">
        {/* Heading aligned to the left */}
        <div className="col-md-6 col-12 text-start mt-3">
          <h6
            className={`searchbar-heading ${style ? "" : "fs-5"} font-bold`}
            style={style}
          >
            {heading}
          </h6>
        </div>

        {/* Button aligned to the right */}
        <div className="col-md-6 col-12 text-md-end text-start mt-3">
          {title && (
            <div>
              <button className="btn-small btn-default " onClick={onClick}>
                <span className="p-2">{title}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search input positioned below */}
      <div className="row mt-3">
        <div className="col-md-3 col-12 offset-md-9 text-end">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                style={{
                  padding: "10px 40px 10px 15px",
                  border: "1px solid #00FF00",
                  borderRadius: "20px",
                  outline: "none",
                  color: "#00FF00",
                  backgroundColor: "#101010",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={() => onSearch(searchQuery)}
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#00FF00",
                  color: "#000",
                  border: "none",
                  borderRadius: " 0 40%  40% 0",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fa fa-search" style={{ fontSize: "16px" }}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Searchbar;
