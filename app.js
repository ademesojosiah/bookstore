const express = require("express");
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");

const bodyParser = require("body-parser");
const conFig = require("./config/config");
const connectDb = require("./db/mongoDb");

const bookRouter = require("./routes/booksRoute");
const authorRouter = require('./routes/authorsRoute')

const app = express();

//connect to mongo db
connectDb();


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//Apply the rate limiting middleware to all requests
app.use(limiter)


//security middleware
app.use(helmet()); 


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
