const query = require('./services/salesforce/query.js');

module.exports = app => {
  app.get('/users', query.getUsers);
  app.get('/seekers', query.getSeekers);
  app.get('/employers', query.getEmployers);
  return app;
};