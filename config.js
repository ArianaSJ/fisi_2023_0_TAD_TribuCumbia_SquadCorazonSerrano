const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const databaseConfig = {
    'host': 'localhost',
    'port': 3306,
    'database': 'DBP_CORE',
    'user':'mysql',
    'password':'Dikk2137++'
};

const db = pgp(databaseConfig);

module.exports = db;