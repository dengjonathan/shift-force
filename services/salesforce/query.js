const jsforce = require('jsforce');
const query = (queryString, accessToken, instanceUrl) => {
  const conn = new jsforce.Connection({
    accessToken,
    instanceUrl
  });
  return new Promise((resolve, reject) => {
    conn.query(queryString, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

exports.getAccounts = (accessToken, instanceUrl) => query(
  'SELECT id, name FROM account LIMIT 50',
  accessToken,
  instanceUrl
);

exports.getSeekers = () => query('SELECT id, name FROM seekers LIMIT 50');