const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:4000',
    clientID: 'Y4qUOXopQXsmbBA35e7VwotY8nGi7aqv',
    issuerBaseURL: 'https://dev-4rwd2bfa77bx8t6m.us.auth0.com'
  };

module.exports = auth(config);