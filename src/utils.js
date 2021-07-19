const redis = require('redis');
const axios = require('axios');
const { promisify } = require('util');

const client = redis.createClient();

client.on("error", (error) => {
  console.error('Redis error', error);
});

const redisGetAsync = promisify(client.get).bind(client);
const redisSetexAsync = promisify(client.setex).bind(client);
const axiosFetchUrl = (url, options) => axios.get(url, options).then(r => r.data);

module.exports = {
  redisGetAsync,
  redisSetexAsync,
  axiosFetchUrl,
};
