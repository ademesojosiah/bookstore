const express = require("express");
const bodyParser = require("body-parser");
const conFig = require("./config/config");
const connectDb = require("./db/mongoDb");

const bookRouter = require("./routes/booksRoute");
const authorRouter = require('./routes/authorsRoute')

const app = express();

//connect to mongo db
connectDb();

//import body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter)
app.get("/", (req, res) => {
  res.send("hello bookstore");
});

//error handler middleware
app.use((err, req, res, next) => {
  console.log(err);
  const errorStatus = err.status || 500;

  res.status(errorStatus).json({ error: err.message });
});

app.listen(conFig.PORT, () => {
  console.log(`server connected to http://localhost:${conFig.PORT}`);
});
