import React from "react";
import joinGroupSvg from "../img/join-group.svg";
import createPostIcon from "../img/create-post-icon.svg";

const MainNav = (props) => {
  const { isLoggedIn } = props;

  return (
    <>
      <div className="main-nav sticky-top row justify-content-between">
        <nav className="nav col-12 col-lg-6">
          <a className="nav-link active" aria-current="page" href="#">
            All Posts
          </a>
          <a className="nav-link " href="#">
            Article
          </a>
          <a className="nav-link" href="#">
            Event
          </a>
          <a className="nav-link" href="#">
            Education
          </a>
          <a className="nav-link" href="#">
            Job
          </a>
        </nav>

        <div className=" main-nav-right col-xl-5 col-lg-6 col-md-6 row justify-content-end me-1">
          <button className="main-nav-btn write-blog-btn ">
            <a
              className="nav-link "
              href="#"
              role="button"
              data-bs-toggle="modal"
              data-bs-target={isLoggedIn ? "#createPostModal" : "#loginModal"}
              style={{ fontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "15px", lineHeight: "20px", color: "#000000" }}
            >
              Write a Post
            </a>
          </button>
          <button className="main-nav-btn ms-3 join-grp-btn ">
            <img className="me-1" src={joinGroupSvg} alt="" />
            <span> Join Group</span>
          </button>
        </div>
        <hr style={{ marginTop: "12px" }} />
      </div>
      <div className="main-nav-android sticky-top ">
        <span className="">Posts(32)</span>
        <button className="main-nav-btn  write-blog-btn dropdown">
          <a className="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filter: All
          </a>
        </button>
        <button
          style={{ background: "none", border: "none", position: "fixed", bottom: "20px", right: "-10px" }}
          data-bs-toggle="modal"
          data-bs-target={isLoggedIn ? "#createPostModal" : "#loginModal"}
        >
          <img src={createPostIcon} alt="" />
        </button>
      </div>
    </>
  );
};

export default MainNav;
