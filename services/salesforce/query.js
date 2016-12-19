const salesforce = require('./connect');

const query = queryString => {
  if (!salesforce.loggedIn) {
    return salesforce.login().then( _ => salesforce.conn.query(queryString));
  }
  return salesforce.conn.query(queryString);
};

exports.getUsers = (cb) => query('SELECT Name FROM Account');