const mongoose = require("mongoose");
const logger = require('../logging/logger')

const config = require("../config/config");

const connectDb = () => {
  mongoose.connect(config.MONGO_URI);

  mongoose.connection.on("connected", () => {
    logger.info("mongoDb connected succesfully");
  });

  mongoose.connection.on("error", (err) => {
    logger.err(err);
  });

  mongoose.set("strictQuery", true);
};

module.exports = connectDb;
