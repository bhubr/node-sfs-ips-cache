require('dotenv').config();

// Feel free to add your own settings,
// e.g. DB connection settings
module.exports = {
  port: process.env.PORT || 5000,

  // redis cache lifetime in seconds
  cacheLifetime: 24 * 7 * 3600,

  // ipstack.com API key
  apiKeyIpStack: process.env.API_KEY_IPSTACK,

  // AbuseIPDB API key
  apiKeyAbuseIPDB: process.env.API_KEY_ABUSEIPDB,
};
