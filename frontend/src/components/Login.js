import React, { useState } from "react";
import illustration from "../img/illus-login-signup.svg";
import closeIcon from "../img/close-icon.svg";
import fbIcon from "../img/fb-icon.svg";
import googleIcon from "../img/google-icon.svg";
import eyeIcon from "../img/eye-icon.svg";
import ForgetPass from "./ForgetPass";

const Login = (props) => {
  const host = "https://atg-world-backend.herokuapp.com";

  const { setIsLoggedIn } = props;

  // Form Data variable using useState hook
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // On Chnage in Input areas
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("signinBtn").disabled = true;
    document.getElementById("spinner-signin").style.display = "inline-block";
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    document.getElementById("signinBtn").disabled = false;
    document.getElementById("spinner-signin").style.display = "none";
    if (json.success) {
      localStorage.setItem("token", json.token);
      setIsLoggedIn(true);
      alert("Login Successfull!");
      document.getElementById("closeLoginModal").click();
    } else {
      alert(json.msg);
    }
  };

  // Show Password Button
  const toggleVisibility = () => {
    const passwordArea = document.getElementById("loginPassword");
    if (passwordArea.type === "password") {
      passwordArea.type = "text";
    } else {
      passwordArea.type = "password";
    }
  };
  return (
    <>
      <div className="modal  fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <button type="button" id="closeLoginModal" data-bs-dismiss="modal" aria-label="Close" style={{ position: "absolute", top: "-31px", right: "-11px", background: "none", border: "none" }}>
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
                <div style={{ fontFamily: "'IBM Plex Sans'", flex: "50%", fontStyle: "normal", fontWeight: 700, fontSize: "24px", lineHeight: "31px", color: "#000000" }}>Sign In</div>
                <div style={{ fontFamily: "'IBM Plex Sans'", flex: "50%", fontStyle: "normal", fontWeight: 400, fontSize: "13px", lineHeight: "17px", textAlign: "right", color: "#3D3D3D" }}>
                  Don’t have an account yet?{" "}
                  <a data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#signupModal" href="">
                    Create new for free!
                  </a>
                </div>
              </div>
              <div className="row mt-3 py-3">
                <div className="col-12 col-lg-6">
                  <form onSubmit={onSubmit}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      onChange={onChange}
                      id="loginusername"
                      style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "3px 3px 0 0" }}
                    />
                    <div style={{ position: "relative" }}>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                        id="loginPassword"
                        style={{ background: "#F7F8FA", border: "1px solid #D9D9DB", height: "46px", borderRadius: "0 0 3px 3px", borderTop: "0" }}
                      />
                      <img
                        src={eyeIcon}
                        alt=""
                        onClick={toggleVisibility}
                        style={{ top: "50%", transform: "translateY(-50%)", position: "absolute", right: "11px", padding: "5px", cursor: "pointer" }}
                      />
                    </div>

                    <button
                      id="signinBtn"
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
                      <span id="spinner-signin" style={{ display: "none" }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;&nbsp;Sign In
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
                      <img src={fbIcon} alt="" /> Sign in with Facebook
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
                      <img src={googleIcon} alt="" /> Sign in with Google
                    </button>
                    <a
                      href="#"
                      style={{
                        marginTop: "23px",
                        textDecoration: "none",
                        fontFamily: "'IBM Plex Sans'",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "16px",
                        textAlign: "center",
                        letterSpacing: "-0.008em",
                        color: "#000000",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#forgetPassModal"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className=" modal-right col-6 pt-4 d-flex flex-column justify-content-between align-items-center ">
                  <img src={illustration} alt="" style={{ width: "250px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ForgetPass />
    </>
  );
};

export default Login;
