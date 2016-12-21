const jsforce = require('jsforce');

// Salesforce OAuth2 client information
const oauth2 = new jsforce.OAuth2({
  loginUrl: 'https://login.salesforce.com',
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: process.env.AUTH_CALLBACK_URL
});

// Login to SF with OAuth2 token
const oauthCallback = queryCode => {
  const conn = new jsforce.Connection({
    oauth2: oauth2
  });
  //var code = req.query.code;
  return new Promise((resolve, reject) => {
    conn.authorize(queryCode, (err, userInfo) => {
      if (err) {
        return resolve(err);
      }
      console.log('Access Token: ' + conn.accessToken);
      console.log('Instance URL: ' + conn.instanceUrl);
      console.log('User ID: ' + userInfo.id);
      console.log('Org ID: ' + userInfo.organizationId);
      resolve({
        accessToken: conn.accessToken,
        instanceUrl: conn.instanceUrl
      });
    });
  });
};

module.exports = {
  oauth2,
  oauthCallback
};