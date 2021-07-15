const express = require('express');
const { port } = require('./config');
const { cachedStopForum } = require('./requesters');

const app = express();

app.get('/stopforumspam', async (req, res) => {
  const data = await cachedStopForum(req.query.ip);
  res.send(data);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});
