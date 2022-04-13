import React from "react";
import logo from "../img/logo-whole.svg";
import searchIcon from "../img/search-icon.svg";

const Navbar = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/#">
          <img src={logo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <div className="navbar-search">
              <input className="navbar-search-bar me-2  " type="search" placeholder="Search for your favorite groups in ATG" aria-label="Search" />
              <img className="navbar-search-icon" src={searchIcon} alt="" />
            </div>
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ ontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "21px", textAlign: "right", color: "#2E2E2E" }}
                >
                  👋 Hi, Welcome Back
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        localStorage.removeItem("token");
                        alert("Logout Successfully!");
                        setIsLoggedIn(false);
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ ontFamily: "'IBM Plex Sans'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "21px", textAlign: "right", color: "#2E2E2E" }}
                >
                  Create account. <span style={{ color: "#4C6FF5" }}> It’s free! </span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#signupModal">
                      Signup
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                      Login
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
