const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  type_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  event_date: {
    type: Date,
  },
  event_location: {
    type: String,
  },
  job_company: {
    type: String,
  },
  job_location: {
    type: String,
  },
  post_by_name: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
