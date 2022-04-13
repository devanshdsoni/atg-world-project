const mongoose = require("mongoose");
const { Schema } = mongoose;

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
  },
  expiredIn: {
    type: Number,
  },
});

module.exports = mongoose.model("Otp", OtpSchema);
