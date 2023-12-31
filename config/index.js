const TOKEN_DETAILS = {
  JWT_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRATION_TIME: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_COOKIE: process.env.REFRESH_TOKEN_COOKIE,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  REFRESH_TOKEN_EXPIRATION_TIME: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
};

module.exports = TOKEN_DETAILS;
