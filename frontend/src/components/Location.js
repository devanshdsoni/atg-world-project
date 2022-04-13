import React from "react";

import locationIcon from "../img/location-icon.svg";
import editLocationIcon from "../img/edit-icon.svg";
import infoIcon from "../img/info-icon.svg";

const Location = () => {
  return (
    <div className="mt-3  " style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <div style={{ display: "flex", alignItems: "center", marginTop: "6px", width: "243px" }}>
        <img src={locationIcon} alt="" />

        <p className="mb-0 ms-1 " style={{ width: "243px", fontFamily: "IBM Plex Sans", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "18px" }}>
          Noida, India
        </p>
        <img className="ms-auto " style={{ cursor: "pointer" }} src={editLocationIcon} alt="" />
      </div>
      <hr className="my-2 bg-secondary " style={{ width: "243px" }} />
      <div className="opacity-50" style={{ width: "243px", display: "flex", alignItems: "flex-start", marginTop: "32px" }}>
        <img src={infoIcon} alt="" />
        <p style={{ width: "243px", fontFamily: "IBM Plex Sans", fontStyle: "normal", fontWeight: 400, fontSize: "12px", lineHeight: "16px", marginLeft: "8px" }}>
          Your location will help us serve better and extend a personalised experience.
        </p>
      </div>
    </div>
  );
};

export default Location;
