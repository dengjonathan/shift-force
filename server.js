const express = require('express');
const app = express();
const config = require('./config/serverConfig');

app.listen(config.PORT||8080);
console.log('server listening on port 8080');

module.exports = app;