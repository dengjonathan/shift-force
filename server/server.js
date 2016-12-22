require('dotenv').config();
const express = require('express');
const session = require('express-session');
const jsforce = require('jsforce');
const app = express();
const SFConnect = require('./services/salesforce/connect');
const SFQuery = require('./services/salesforce/query');

app.use(session({
  secret: 'supaSecret',
  resave: false,
  saveUninitialized: true
}));

// Connect to salesforce
SFConnect.login()
  .then(conn => {
    console.log(conn.accessToken);
    return conn.query('SELECT id, name FROM account LIMIT 50')
  })
  .then(console.log);

app.get('/accounts', (req, res) => {
  console.log(req.session.accessToken, req.session.instanceUrl);
  res.end('hello world');
  SFQuery.getAccounts(req.session.accessToken, req.session.instanceUrl)
    .then(console.log);
});


app.listen(process.env.PORT || 8080);
console.log('server listening on port 8080');

module.exports = app;