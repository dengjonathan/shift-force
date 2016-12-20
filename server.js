require('dotenv').config();
const express = require('express');
const session = require('express-session');
const jsforce = require('jsforce');
const passport = require('passport');
const app = express();
const SFConnect = require('./services/salesforce/oauth');
const SFQuery = require('./services/salesforce/query');

app.use(session({
  secret: 'supaSecret',
  resave: false,
  saveUninitialized: true
}));

/* SF OAuth request, redirect to SF login */
app.get('/oauth/auth', function (req, res) {
  res.redirect(SFConnect.oauth2.getAuthorizationUrl({
    scope: 'api id web'
  }));
});

/* OAuth callback from SF, pass received auth code and get access token */
app.get('/oauth/callback', function (req, res) {
  SFConnect.oauthCallback(req.query.code)
    .then(({accessToken, instanceUrl}) => {
      console.log(accessToken, instanceUrl)
      req.session.accessToken = accessToken;
      req.session.instanceUrl = instanceUrl;
      res.redirect('/accounts');
    });
});

app.get('/accounts', (req, res) => {
  console.log(req.session.accessToken, req.session.instanceUrl);
  res.end('hello world');
  SFQuery.getAccounts(req.session.accessToken, req.session.instanceUrl)
    .then(console.log);
});


app.listen(process.env.PORT || 8080);
console.log('server listening on port 8080');

module.exports = app;