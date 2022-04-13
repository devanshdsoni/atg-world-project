const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

// --> For connecting Locally
// const server = "127.0.0.1:27017";
// const dbName = "atg_world";

const connectToMongo = () => {
  mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, () => {
    console.log("Connected to Mongo");
  });
};

module.exports = connectToMongo;
