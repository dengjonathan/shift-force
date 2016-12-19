require('dotenv').config();
const express = require('express');
const jsforce = require('jsforce');
const app = express();
console.log(process.env.SF_CLIENT_ID);
//const oauth2 = require('./services/salesforce/oauth');
console.log(process.env.AUTH_CALLBACK_URL);

const oauth2 = new jsforce.OAuth2({
  loginUrl : 'https://login.salesforce.com',  
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
    redirectUri: process.env.AUTH_CALLBACK_URL
});

/* SF OAuth request, redirect to SF login */
app.get('/oauth/auth', function(req, res) {
    res.redirect(oauth2.getAuthorizationUrl({scope: 'api id web'}));
});

/* OAuth callback from SF, pass received auth code and get access token */
app.get('/oauth/callback', function(req, res) {
    const conn = new jsforce.Connection({oauth2: oauth2});
    var code = req.query.code;
    conn.authorize(code, function(err, userInfo) {
        if (err) { return console.error(err); }

        console.log('Access Token: ' + conn.accessToken);
        console.log('Instance URL: ' + conn.instanceUrl);
        console.log('User ID: ' + userInfo.id);
        console.log('Org ID: ' + userInfo.organizationId);

        // req.session.accessToken = conn.accessToken;
        // req.session.instanceUrl = conn.instanceUrl;
        res.redirect('/accounts');
    });
});

app.listen(process.env.PORT||8080);
console.log('server listening on port 8080');

module.exports = app;