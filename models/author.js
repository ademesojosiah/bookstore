const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  books: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
  }
},);

module.exports = mongoose.model("author", authorSchema);
