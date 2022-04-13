import React from "react";
import navigateBack from "../img/navigate-back-icon.svg";

const Header = () => {
  return (
    <>
      <div className="header"></div>
      <div className="header-android-section">
        <img src={navigateBack} alt="" />
        <button>Join Group</button>
      </div>
      <div className="header-text">
        <h1>Computer Engineering</h1>
        <p>142,765 Computer Engineers follow this</p>
      </div>
    </>
  );
};

export default Header;
