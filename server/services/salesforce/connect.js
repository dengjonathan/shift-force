const jsforce = require('jsforce');
const Promise = require('bluebird');

const getConnection = function () {
  const conn = new jsforce.Connection({
    oauth2: {
      // you can change loginUrl to connect to sandbox or prerelease env.
      // loginUrl : 'https://test.salesforce.com',
      clientId: process.env.SF_CLIENT_ID,
      clientSecret: process.env.SF_CLIENT_SECRET,
      redirectUri: process.env.AUTH_CALLBACK_URL
    }
  });
  // Convert all of conn's methods to Promise API
  Promise.promisifyAll(Object.getPrototypeOf(conn));
  return conn;
}

const login = function () {
  return this.conn.login(process.env.USERNAME, process.env.PASSWORD + process.env.SECURITY_TOKEN)
    .then(userInfo => {
      return this.conn;
    })
    .catch(err => console.error('Error while logging in', err));
}

module.exports = {
  conn: getConnection(),
  login
};