import React from "react";
import Location from "./Location";
import MainNav from "./MainNav";
import Posts from "./Posts";

const MainSection = (props) => {
  const { isLoggedIn, setIsLoggedIn, allPost, setAllPost } = props;

  return (
    <div className="main-section">
      <MainNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="col-12 col-lg-8" style={{ backgroundColor: "#fdfdfd" }}>
          <Posts allPost={allPost} setAllPost={setAllPost} />
        </div>
        <div className=" location-section col-4">
          <Location />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
