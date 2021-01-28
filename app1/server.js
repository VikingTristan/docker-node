'use strict';

const files = './';
const fs = require('fs');

const express = require('express');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Hello I am app 1. \n These are my files ${fs.readdirSync(files)}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);