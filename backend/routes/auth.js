const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const User = require("../modals/User");
const Otp = require("../modals/Otp");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const jwtSecret = process.env.JWT_SECRET;

// Route 01 👇 - User Registration
router.post(
  "/signup",
  [body("username", "Minimum Length for username is 5!").isLength({ min: 5 }), body("email", "Invalid Email!").isEmail(), body("password", "Minimum Length for Password is 8!").isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });

    try {
      // Find Email document in MongoDB
      const docEmail = await User.findOne({ email: req.body.email });
      if (docEmail) return res.status(401).json({ success: false, msg: "This Email is already registered!" });

      // Find Username in database
      const docUser = await User.findOne({ username: req.body.username });
      if (docUser) return res.status(401).json({ success: false, msg: "This Username is already registered! Please Select other username" });

      // -- Generate Salt and Secure password using BcryptJS
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      // -- Save Data in Database
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: securePassword,
      });

      // -- Creating an Authenticaton Token usin JWT to send user
      const jwtData = {
        userId: user.id,
      };
      const token = jwt.sign(jwtData, jwtSecret);

      // -- Sending data to user
      res.json({ success: true, msg: "Signup Successfull!", token });
      //
    } catch (error) {
      return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
    }
  }
);

//Route 02 👇 - User Login
router.post("/login", [body("password", "Password can not be blank!!").exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });

  try {
    const { username, password } = req.body;

    // Find User in database
    const user = await User.findOne({ username: username });
    if (!user) return res.status(401).json({ success: false, msg: "This Username is not registered!" });

    // If User exists then Compare the given password with user password that found in database
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) return res.status(401).json({ success: false, msg: "Invalid Username or Password!" });

    // if user exists and password also matched then send an Authenticaton Token using JWT
    const jwtData = {
      userId: user.id,
    };
    const token = jwt.sign(jwtData, jwtSecret);

    // -- Sending data to user
    res.json({ success: true, msg: "Login Successfull!", token });
    //
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

//Route 03 👇 - Change password using Old Password
router.put(
  "/changepassword",
  fetchuser,
  [body("oldPassword", "Password can not be blank!!").exists(), body("newPassword", "New Password must have atleast 8 characters!!").isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });

    try {
      const { oldPassword, newPassword } = req.body;

      // --Find Username in database
      const user = await User.findById(req.userId);

      if (!user) return res.status(401).json({ success: false, msg: "This User is not registered!" });

      // --If User exists then Compare the given password by user with orignal password in database
      const passwordCompare = await bcrypt.compare(oldPassword, user.password);
      if (!passwordCompare) return res.status(401).json({ success: false, msg: "Invalid Old Password!" });

      // -- Generate Salt and NEW Secure password using BcryptJS
      const salt = await bcrypt.genSalt(10);
      const newSecurePassword = await bcrypt.hash(newPassword, salt);

      const newUser = {
        password: newSecurePassword,
      };
      // -- Update User with NEW User object in Database
      const updatedPassword = await User.findByIdAndUpdate(req.userId, newUser, { new: true });

      // -- Send response to user
      res.json({ success: true, msg: "Password updated Successfully!" });
      //
    } catch (error) {
      return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
    }
  }
);

//---👇👇👇👇👇👇👇👇 FORGOT PASSWORD API 👇👇👇👇👇👇👇👇---//

// Route 04 👇 - Send Email if FORGET PASSWORD
router.post("/sendemail", [body("email", "Email is not correct").isEmail().notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });

  try {
    // Find Email in database (Exists or Not)
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ success: false, msg: "This Email is not registered!" });

    // Generate Random OTP code to send in User Email
    const otpCode = Math.floor(Math.random() * 1000000 + 9);

    // Save this Random OTP is Database to verify later
    const otpData = Otp.create({
      email: req.body.email,
      code: otpCode,
      expiredIn: new Date().getTime() + 300 * 1000, // --> 5 Min to miliseconds
    });

    // Sending Mail to User using Nodemailer
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",

      auth: {
        user: "project.atg.test@gmail.com", // Gmail ID
        pass: process.env.NODEMAILER_GMAIL_PASSWORD, // GMail Account Password
      },
    });

    const mailOptions = {
      from: "project.atg.test@gmail.com", // sender address
      to: req.body.email, // list of receivers
      subject: "OTP for Password Reast | ATG World ", // Subject line
      html: `<h2>Your OTP to Reast Password is - <b>${otpCode}</b> </h2> <h3>It will be Expired in Next 5 minutes</h3>`, // html body
    };

    // send mail with defined transport object
    let info = transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(500).json({ success: false, msg: "Internal Server Errorrr!", err });
      res.json({ success: true, msg: "Email Sent Succussfully" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

// Route 05 👇 - Verifying OTP
router.post("/verifyotp", [body("email", "Email is not correct").isEmail(), body("otp", "Must Be atleast 6 digits").isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });

  try {
    const { email, otp } = req.body;

    // --Find email and otp in database to verify
    const user = await Otp.findOne({ email: email, code: otp });
    if (!user) return res.status(401).json({ success: false, msg: "Invalid OTP!" });

    // -- Check OTP Expiry time
    const currTime = new Date().getTime();
    if (currTime > user.expiredIn) return res.status(401).json({ success: false, msg: "OTP Expired, Please try again!" });

    // -- Create a token to verfy identity
    const jwtOtpSecret = "otpverification@atg-world";
    const jwtOtpData = {
      email: email,
      otp: otp,
    };
    const otpToken = jwt.sign(jwtOtpData, jwtOtpSecret, { expiresIn: "1h" });

    // -- Send response to user
    res.json({ success: true, msg: "OTP Matched Successfully!", otpToken });
    //
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

// Route 06 👇 - Reset Password after OTP Verification
router.put("/resetpassword", [body("newPassword", "New Password must have atleast 8 characters!!").isLength({ min: 8 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });

  try {
    const otpToken = req.header("otpToken");
    if (!otpToken) return res.status(401).json({ success: false, msg: "Unauthorized aceess!" });

    const jwtOtpSecret = "otpverification@atg-world";

    // Recieve jwtOtpData from otpToken using jwt.verify method
    jwtOtpData = jwt.verify(otpToken, jwtOtpSecret);

    const { email, otp } = jwtOtpData;

    // --Find again a Document matches email and otp in database
    const doc = await Otp.findOne({ email: email, code: otp });
    if (!doc) return res.status(401).json({ success: false, msg: "Invalid OTP!" });

    // --Find Username in database
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ success: false, msg: "This User is not registered!" });

    const { newPassword } = req.body;

    // // -- Generate Salt and NEW Secure password using BcryptJS
    const salt = await bcrypt.genSalt(10);
    const newResetPassword = await bcrypt.hash(newPassword, salt);

    const newUser = {
      password: newResetPassword,
    };
    // -- Update User with NEW User object in Database
    const updatedPassword = await User.findByIdAndUpdate(user._id, newUser, { new: true });

    // -- Send response to user
    res.json({ success: true, msg: "Password updated Successfully!" });
    //
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

module.exports = router;
