const express = require("express");
const router = express.Router();
const User = require("../modals/User");
const Post = require("../modals/Post");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// Route 01 Create a New Post
router.post("/createpost", fetchuser, [body("title", "Minimum Length for title is 5!").exists().isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });
  try {
    // -- Get user data from database for fullname and userID
    const user = await User.findById(req.userId).select("-password");

    // -- Full name of User
    const post_by_name = user.firstName + " " + user.lastName;

    // -- Creating Object to store Post Data sent by User
    const postData = {};
    postData.post_by_name = post_by_name;
    postData.user = req.userId;
    if (req.body.type) postData.type = req.body.type;
    if (req.body.type_name) postData.type_name = req.body.type_name;
    if (req.body.title) postData.title = req.body.title;
    if (req.body.description) postData.description = req.body.description;
    if (req.body.event_date) postData.event_date = req.body.event_date;
    if (req.body.event_location) postData.event_location = req.body.event_location;
    if (req.body.job_company) postData.job_company = req.body.job_company;

    // -- Saving the object in databse
    const post = await Post.create(postData);

    // -- Sending response to user
    res.json({ success: true, msg: "Post created successfully!", post });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

// Route 02 Get All Posts
router.get("/fetchallpost", async (req, res) => {
  try {
    const posts = await Post.find();

    // -- Sending response to user
    res.json({ success: true, msg: "Post fetched successfully!", posts });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

// Route 03 Delete a Post
router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);
    const post = await Post.findById(postId);
    console.log(post);
    if (!post) {
      return res.status(401).json({ success: false, msg: "Unautharized access!" });
    }
    if (post.user.toString() !== req.userId) {
      return res.status(401).json({ success: false, msg: "Unautharized access!" });
    }

    const deletedNote = await Post.findByIdAndDelete(postId);

    res.json({
      success: true,
      msg: "Post deleted successfully!",
      deletedNote,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!!!!", error });
  }
});

module.exports = router;
