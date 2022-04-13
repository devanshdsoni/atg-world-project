import React, { useState } from "react";
import illustration from "../img/illus-login-signup.svg";
import closeIcon from "../img/close-icon.svg";
import fbIcon from "../img/fb-icon.svg";
import googleIcon from "../img/google-icon.svg";
import eyeIcon from "../img/eye-icon.svg";

const Signup = (props) => {
  const host = "https://atg-world-backend.herokuapp.com";
  const { setIsLoggedIn } = props;

  // Form Data variable using useState hook
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  // On Chnage in Input areas
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("signupBtn").disabled = true;
    document.getElementById("spinner-signup").style.display = "inline-block";
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    document.getElementById("signupBtn").disabled = false;
    document.getElementById("spinner-signup").style.display = "none";
    if (json.success) {
      localStorage.setItem("token", json.token);
      setIsLoggedIn(true);
      alert("Account Created Successfully!");
      document.getElementById("closeSignupModal").click();
    } else {
      alert(json.msg);
    }
  };

  // Show Password Button
  const toggleVisibility = () => {
    const passwordArea = document.getElementById("signupPassword");
    if (passwordArea.type === "password") {
      passwordArea.type = "text";
    } else {
      passwordArea.type = "password";
    }
  };
  return (
    <div className="modal  fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <button type="button" id="closeSignupModal" data-bs-dismiss="modal" aria-label="Close" style={{ position: "absolute", top: "-31px", right: "-11px", background: "none", border: "none" }}>
            <img src={closeIcon} alt="" />
          </button>
          <div
            style={{
              paddingTop: "17px",
              paddingBottom: "17px",
              background: "#EFFFF4",
              borderRadius: "8px 8px 0px 0px",
              fontFamily: "'IBM Plex Sans'",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              textAlign: "center",
              color: "#008A45",
            }}
          >
            Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼
          </div>
          <div className="modal-body px-5">
            <div className="d-flex justify-content-between align-items-center">
              <div style={{ fontFamily: "'IBM Plex Sans'", flex: "60%", fontStyle: "normal", fontWeight: 700, fontSize: "24px", lineHeight: "31px", color: "#000000" }}>Create Account</div>
              <div style={{ fontFamily: "'IBM Plex Sans'", flex: "40%", fontStyle: "normal", fontWeight: 400, fontSize: "13px", lineHeight: "17px", textAlign: "right", color: "#3D3D3D" }}>
                Already have an account?{" "}
                <a data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">
                  Sign In
                </a>
              </div>
            </div>

            <div className="row mt-3 py-3">
              <div className="col-12 col-lg-6">
                <form onSubmit={onSubmit}>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="firstName"
                      id="firstname"
                      onChange={onChange}
                      style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "3px 0 0 0" }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={onChange}
                      id="lastname"
                      style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "0 3px 0 0" }}
                    />
                  </div>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={onChange}
                    id="email"
                    aria-describedby="emailHelp"
                    style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "0", borderTop: "0" }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    onChange={onChange}
                    id="username"
                    style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "0", borderTop: "0" }}
                  />
                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={onChange}
                      id="signupPassword"
                      style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "0 0 3px 3px", borderTop: "0" }}
                    />
                    <img
                      src={eyeIcon}
                      alt=""
                      onClick={toggleVisibility}
                      style={{ top: "50%", transform: "translateY(-50%)", position: "absolute", right: "11px", padding: "5px", cursor: "pointer" }}
                    />
                  </div>

                  {/* <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    id="confirmpassword"
                    style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "0 0 3px 3px", borderTop: "0" }}
                  /> */}

                  <button
                    id="signupBtn"
                    type="submit"
                    style={{
                      background: "#2F6CE5",
                      borderRadius: "20px",
                      marginTop: "20px",
                      width: "100%",
                      fontFamily: "'IBM Plex Sans'",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "16px",
                      textAlign: "center",
                      color: "#FFFFFF",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                    className="btn btn-primary"
                  >
                    <span id="spinner-signup" style={{ display: "none" }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;&nbsp; Create Account
                  </button>
                </form>
                <div className="d-flex flex-column mt-4">
                  <button
                    style={{
                      background: "#FFFFFF",
                      border: "0.6px solid #D9D9DB",
                      boxSizing: "border-box",
                      borderRadius: "3px",
                      height: "38px",
                      fontFamily: "'IBM Plex Sans'",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "16px",
                      color: "#000000",
                    }}
                  >
                    <img src={fbIcon} alt="" /> Sign up with Facebook
                  </button>
                  <button
                    style={{
                      marginTop: "8px",
                      background: "#FFFFFF",
                      border: "0.6px solid #D9D9DB",
                      boxSizing: "border-box",
                      borderRadius: "3px",
                      height: "38px",
                      fontFamily: "'IBM Plex Sans'",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "16px",
                      color: "#000000",
                    }}
                  >
                    <img src={googleIcon} alt="" /> Sign up with Google
                  </button>
                </div>
              </div>
              <div className=" modal-right col-6 pt-4 d-flex flex-column justify-content-between align-items-center ">
                <img src={illustration} alt="" style={{ width: "250px" }} />
                <p
                  style={{
                    marginTop: "15px",
                    fontFamily: "'IBM Plex Sans'",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "11px",
                    lineHeight: "16px",
                    textAlign: "right",
                    letterSpacing: "-0.008em",
                    color: "#000000",
                    opacity: 0.6,
                  }}
                >
                  By signing up, you agree to our Terms & conditions, Privacy policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
