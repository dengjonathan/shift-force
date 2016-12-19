const jsforce = require('jsforce');
const Promise = require('bluebird');

const config = require('../../config/salesforceConfig');

let accessToken = null;
let instanceUrl = null;

const getConnection = function () {
  const conn = new jsforce.Connection({
    oauth2: {
      // you can change loginUrl to connect to sandbox or prerelease env.
      // loginUrl : 'https://test.salesforce.com',
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.callbackUrl
    }
  });
  // Convert all of conn's methods to Promise API
  Promise.promisifyAll(Object.getPrototypeOf(conn));
  return conn;
}

const login = function() {
  return this.conn.login(config.username, config.password + config.securityToken)
    .then(userInfo => {
      accessToken = this.conn.accessToken;
      instanceUrl = this.conn.instanceUrl;
      this.loggedIn = true;
    })
    .catch(err => console.error('Error while logging in', err));
}

module.exports = {
  conn: getConnection(),
  loggedIn: false,
  login
};