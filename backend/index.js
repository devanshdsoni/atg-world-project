const connectToMongo = require("./db_connect");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working - You are doing Great Devansh :)");
});

// --> Router for User Authentication and Forgot Password
app.use("/api/auth", require("./routes/auth"));

// --> Router for Post CRUD
app.use("/api/post", require("./routes/post"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
