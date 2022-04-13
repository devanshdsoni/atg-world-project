const jwt = require("jsonwebtoken");
const User = require("../modals/User");

//
const jwtSecret = process.env.JWT_SECRET;

// ---- This function will work as a Middleware to validate the token & check user exist or not
const fetchuser = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) return res.status(401).json({ success: false, msg: "Unauthorized aceess!" });

    // Recieve jwtData from token using jwt.verify method
    jwtData = jwt.verify(token, jwtSecret);

    const user = await User.findById(jwtData.userId);
    if (!user) {
      return res.status(401).json({ success: false, msg: "User not exists" });
    }
    req.userId = jwtData.userId; // Set req parameter to jwtData
    next();
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
};

module.exports = fetchuser;
