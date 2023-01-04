const mongoose = require("mongoose");

const config = require("../config/config");

const connectDb = () => {
  mongoose.connect(config.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("mongoDb connected succesfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occured");
    console.log(err);
  });

  mongoose.set("strictQuery", true);
};

module.exports = connectDb;
