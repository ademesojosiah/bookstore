const express = require("express");

const {
  addAuthorValidationMiddleware,
  updateAuthorValidationMiddleware,
} = require("../validation/author.validation");

const {
  addAuthor,
  deleteAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
} = require("../controllers/author.controller");
const authorRouter = express.Router();

authorRouter
  .route("/")
  .get(getAllAuthors)
  .post(addAuthorValidationMiddleware, addAuthor);
authorRouter
  .route("/:id")
  .get(getSingleAuthor)
  .put(updateAuthorValidationMiddleware, updateAuthor)
  .delete(deleteAuthor);

module.exports = authorRouter;
