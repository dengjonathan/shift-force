const jsforce = require('jsforce');

// Salesforce OAuth2 client information
module.exports = new jsforce.OAuth2({
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
    redirectUri: process.env.AUTH_CALLBACK_URL
});
