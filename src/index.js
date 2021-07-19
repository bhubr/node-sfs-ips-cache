const express = require('express');
const cors = require('cors');
const querystring = require('querystring');

const { port, apiKeyIpStack } = require('./config');
const { cachedStopForum, cachedIpStack } = require('./requesters');

const app = express();
app.use(cors());

app.get('/stopforumspam', async (req, res) => {
  const data = await cachedStopForum(`/api?json&ip=${req.query.ip}`);
  res.send(data);
});

app.get('/ipstack', async (req, res) => {
  const data = await cachedStopForum(`/${req.query.ip}?access_key=${apiKeyIpStack}`);
  res.send(data);
});

app.get('/abuseipdb', async (req, res) => {
  const query = {
    maxAgeInDays: 90,
    ipAddress: `${req.query.ip}`,
  }
  const data = await cachedStopForum(`/api/v2/check?${querystring.encode(query)}`);
  res.send(data);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});
