const { redisGetAsync, redisSetexAsync, axiosFetchUrl} = require('./utils');
const {cacheLifetime } = require('./config');

const cachedRequestFactory = ({
  redisGet,
  redisSetex,
  fetchUrl,
  lifetime,
  baseUrl,
}) => async (pathname) => {
  const url = `${baseUrl}${pathname}`;
  const existing = await redisGet(url);
  if (existing) {
    console.log('From cache', url);
    return JSON.parse(existing);
  }
  console.log('From url', url);
  const data = await fetchUrl(url);
  await redisSetex(url, lifetime, JSON.stringify(data));
  return data;
}

const cachedStopForum = cachedRequestFactory({
  redisGet: redisGetAsync,
  redisSetex: redisSetexAsync,
  fetchUrl: axiosFetchUrl,
  baseUrl: 'http://api.stopforumspam.org/api?json&ip=',
  lifetime: cacheLifetime,
});

module.exports = {
  cachedStopForum,
};
