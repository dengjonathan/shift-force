const jsforce = require('jsforce');
const app = require('express')();

const config = require('./config/salesforceConfig');

var conn = new jsforce.Connection({
  oauth2 : {
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: config.callbackUrl 
  }
});

conn.login(config.username, config.password + config.securityToken, function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});

app.listen(8080);
  console.log('server listening on port 8080');