import React, { useState } from "react";
import eyeIcon from "../img/eye-icon.svg";

const ForgetPass = () => {
  const host = "https://atg-world-backend.herokuapp.com";

  const [emailSent, setEmailSent] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);

  // ---------- Send Email -------------
  const [formData, setFormData] = useState({
    email: "",
  });

  const onChnage = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send Email to Given Email
  const sendEmail = async (e) => {
    e.preventDefault();
    document.getElementById("sendEmailBtn").disabled = true;
    document.getElementById("spinner-send-email").style.display = "inline-block";

    const response = await fetch(`${host}/api/auth/sendemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    document.getElementById("sendEmailBtn").disabled = false;
    document.getElementById("spinner-send-email").style.display = "none";
    if (json.success) {
      setEmailSent(true);
      alert(json.msg);
    } else {
      alert(json.msg);
    }
  };

  // ---------- OTP Verify ---------
  const verifyOtp = async (e) => {
    e.preventDefault();
    document.getElementById("sendOtpBtn").disabled = true;
    document.getElementById("spinner-verify-otp").style.display = "inline-block";

    const response = await fetch(`${host}/api/auth/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    document.getElementById("sendOtpBtn").disabled = false;
    document.getElementById("spinner-verify-otp").style.display = "none";
    if (json.success) {
      setOtpVerified(true);
      setFormData({ email: "" });
      localStorage.otpToken = json.otpToken;
      alert(json.msg);
    } else {
      alert(json.msg);
    }
  };

  // -------------- Reset Password after OTP is verified ---------------
  const [passFormData, setPassFormData] = useState({
    newPassword: "",
  });
  const onPasswordChange = (e) => {
    setPassFormData({ ...passFormData, [e.target.name]: e.target.value });
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    document.getElementById("createPassword").disabled = true;
    document.getElementById("spinner-reset-pass").style.display = "inline-block";
    const response = await fetch(`${host}/api/auth/resetpassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        otpToken: localStorage.getItem("otpToken"),
      },
      body: JSON.stringify(passFormData),
    });
    const json = await response.json();
    document.getElementById("createPassword").disabled = false;
    document.getElementById("spinner-reset-pass").style.display = "none";
    if (json.success) {
      localStorage.removeItem("otpToken");
      setEmailSent(false);
      setOtpVerified(false);
      document.getElementById("closeForgetPassModal").click();
      alert(json.msg);
    } else {
      localStorage.removeItem("otpToken");
      setEmailSent(false);
      setOtpVerified(false);
      alert(json.msg);
    }
  };

  // Show Password Button
  const toggleVisibility = () => {
    const passwordArea = document.getElementById("createPassword");
    if (passwordArea.type === "password") {
      passwordArea.type = "text";
    } else {
      passwordArea.type = "password";
    }
  };

  return (
    <div className="modal fade" id="forgetPassModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="forgetPass" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="forgetPass">
              Forgot Password
            </h5>
            <button
              type="button"
              id="closeForgetPassModal"
              className="btn-close"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
              aria-label="Close"
              onClick={() => {
                setEmailSent(false);
                setFormData({ email: "" });
              }}
            ></button>
          </div>

          <div className="modal-body">
            {!isOtpVerified ? (
              <>
                {/* --------------------- If OTP is not varified ---------------------  */}
                <div>
                  <p>Enter your Email Address to get OTP</p>
                  <form>
                    <div className="form-floating my-3">
                      <input type="email" className="form-control" name="email" id="emailFloating" placeholder="name@example.com" onChange={onChnage} required disabled={emailSent ? true : false} />
                      <label htmlFor="emailFloating">Email address</label>
                    </div>
                    {emailSent ? (
                      <>
                        <div className="form-floating mt-3">
                          <input type="number" className="form-control" name="otp" id="otpFloating" placeholder="Enter OTP" onChange={onChnage} required minLength={6} />
                          <label htmlFor="otpFloating">Enter OTP</label>
                        </div>
                        <div id="emailHelp" className="form-text">
                          Check Spam folder if didn't get any OTP
                        </div>
                        <button id="sendOtpBtn" type="submit" className="btn btn-primary my-3" onClick={verifyOtp}>
                          <span id="spinner-verify-otp" style={{ display: "none" }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verify OTP
                        </button>
                      </>
                    ) : (
                      <button id="sendEmailBtn" type="submit" className="btn btn-primary" onClick={sendEmail}>
                        <span id="spinner-send-email" style={{ display: "none" }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Get OTP
                      </button>
                    )}
                  </form>
                </div>
              </>
            ) : (
              <>
                {/* --------------------- After OTP Verification --------------------- */}
                <div>
                  <h4>Create a New Password</h4>
                  <form>
                    <div style={{ position: "relative" }}>
                      <div className="form-floating mt-4 mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="newPassword"
                          id="createPassword"
                          onChange={onPasswordChange}
                          style={{ borderRadius: "3px" }}
                          required
                          minLength={8}
                        />
                        <label htmlFor="createPassword">Enter New Password</label>
                      </div>

                      <img
                        src={eyeIcon}
                        alt=""
                        onClick={toggleVisibility}
                        style={{ top: "50%", transform: "translateY(-50%)", position: "absolute", right: "11px", padding: "5px", cursor: "pointer" }}
                      />
                    </div>
                    <button id="sendEmailBtn" type="submit" className="btn btn-primary" onClick={resetPassword}>
                      <span id="spinner-reset-pass" style={{ display: "none" }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Submit
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
