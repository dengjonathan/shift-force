const express = require('express');
const app = express();

app.listen(process.env.PORT||8080);
console.log('server listening on port 8080');

module.exports = app;