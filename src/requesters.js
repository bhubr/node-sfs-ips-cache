const { redisGetAsync, redisSetexAsync, axiosFetchUrl } = require('./utils');
const { cacheLifetime, apiKeyAbuseIPDB } = require('./config');

const cachedRequestFactory = ({
  redisGet,
  redisSetex,
  fetchUrl,
  lifetime,
  baseUrl,
  options = {},
}) => async (pathname) => {
  const url = `${baseUrl}${pathname}`;
  const existing = await redisGet(url);
  if (existing) {
    console.log('From cache', url);
    return JSON.parse(existing);
  }
  console.log('From url', url);
  const data = await fetchUrl(url, options);
  await redisSetex(url, lifetime, JSON.stringify(data));
  return data;
}

const cachedStopForum = cachedRequestFactory({
  redisGet: redisGetAsync,
  redisSetex: redisSetexAsync,
  fetchUrl: axiosFetchUrl,
  baseUrl: 'http://api.stopforumspam.org',
  lifetime: cacheLifetime,
});

const cachedIpStack = cachedRequestFactory({
  redisGet: redisGetAsync,
  redisSetex: redisSetexAsync,
  fetchUrl: axiosFetchUrl,
  baseUrl: 'http://api.ipstack.com',
  lifetime: cacheLifetime,
});

const cachedAbuseIPDB = cachedRequestFactory({
  redisGet: redisGetAsync,
  redisSetex: redisSetexAsync,
  fetchUrl: axiosFetchUrl,
  baseUrl: 'https://api.abuseipdb.com',
  lifetime: cacheLifetime,
  options: {
    headers: {
      accept: 'application/json',
      key: `${apiKeyAbuseIPDB}`,
    }
  }
});

module.exports = {
  cachedStopForum,
  cachedIpStack,
  cachedAbuseIPDB,
};
