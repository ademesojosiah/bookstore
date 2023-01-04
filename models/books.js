const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
    max: [2022, "Year must be less than or equal to 2020"], // validation with custom message
  },
  isbn: {
    type: String,
    required: true,
    unique: [true, "ISBN must be unique"], //validation with custom message
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price must be greater than or equal to 0"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("book", bookSchema);
