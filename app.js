const express = require("express");
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const {requiresAuth} = require('express-openid-connect')


const conFig = require("./config/config");
const connectDb = require("./db/mongoDb");
const logger = require('./logging/logger')

const bookRouter = require("./routes/booksRoute");
const authorRouter = require('./routes/authorsRoute')
const pageNotFound = require('./middlewares/notFound')

const app = express();

const auth0Middleware = require('./auth/auth0');
//connect to mongo db
connectDb();

app.use(auth0Middleware)

//import body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//Apply the rate limiting middleware to all requests
app.use(limiter)


//security middleware
app.use(helmet()); 


app.use("/api/v1/books",requiresAuth, bookRouter);
app.use("/api/v1/authors",requiresAuth, authorRouter)
app.get("/", (req, res) => {
  res.send("hello bookstore");
});

//error handler middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  const errorStatus = err.status || 500;

  res.status(errorStatus).json({ error: err.message });
});

app.use(pageNotFound)

app.listen(conFig.PORT, () => {
  logger.info(`server connected to http://localhost:${conFig.PORT}`);
});
