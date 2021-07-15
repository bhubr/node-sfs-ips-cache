require('dotenv').config();

// Feel free to add your own settings,
// e.g. DB connection settings
module.exports = {
  port: process.env.PORT || 5000,

  // redis cache lifetime in seconds
  cacheLifetime: 48 * 3600,
};
