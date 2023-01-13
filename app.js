const express = require("express");
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const {requiresAuth} = require('express-openid-connect')
// const { auth } = require('express-oauth2-jwt-bearer');
var request = require("request");

// var options = { method: 'POST',
//   url: 'https://dev-4rwd2bfa77bx8t6m.us.auth0.com/oauth/token',
//   headers: { 'content-type': 'application/json' },
//   body: '{"client_id":"G6vCMVPyNichOGEgLIaT3t3rxY6pX5VE","client_secret":"rgH49M1FvZ3vcjgxeDi9FaAgfW7ypsWWteuD2TQ-RPyUe8z34QgSVnepCyLeVFok","audience":"http://localhost:4000","grant_type":"client_credentials"}' };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

// // Authorization middleware. When used, the Access Token must
// // exist and be verified against the Auth0 JSON Web Key Set.
// const checkJwt = auth({
//   audience: 'http://localhost:4000',
//   issuerBaseURL: `https://dev-4rwd2bfa77bx8t6m.us.auth0.com/`,
// });


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
  res.send('<h>welcome to bookstore Api</h><h><a href="/login">Login here</a></h>');
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
