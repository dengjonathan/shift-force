const query = require('./services/salesforce/query.js');

module.exports = app => {
  app.get('/users', query.getUsers);
  app.get('/seekers', query.getSeekers);
  app.get('/employers', query.getEmployers);

  // ROUTES FOR SF OAUTH2 FLOW
  /* SF OAuth request, redirect to SF login */
  app.get('/oauth/auth', function (req, res) {
    res.redirect(SFConnect.oauth2.getAuthorizationUrl({
      scope: 'api id web'
    }));
  });

  /* OAuth callback from SF, pass received auth code and get access token */
  app.get('/oauth/callback', function (req, res) {
    SFConnect.oauthCallback(req.query.code)
      .then(({
        accessToken,
        instanceUrl
      }) => {
        console.log(accessToken, instanceUrl)
        req.session.accessToken = accessToken;
        req.session.instanceUrl = instanceUrl;
        res.redirect('/accounts');
      });
  });
  
  return app;
};