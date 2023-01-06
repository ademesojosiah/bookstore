const express = require("express");

const {
  addBookValidationMiddleware,
  updateBookValidationMiddleware,
} = require("../validation/books.validator");
const {
  addBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} = require("../controllers/book.controller");
const bookRouter = express.Router();



bookRouter
  .route("/")
  .get(getAllBooks)
  .post(addBookValidationMiddleware, addBook);
bookRouter
  .route("/:id")
  .get(getSingleBook)
  .put(updateBookValidationMiddleware, updateBook)
  .delete(deleteBook);

module.exports = bookRouter;
