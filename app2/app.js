'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello, this app only exists to show an example of multiple apps in a docker stack.');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);