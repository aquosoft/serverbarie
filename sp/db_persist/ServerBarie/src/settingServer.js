const variables = require ("./ENV.json");
let setting = {
    mysqlData : {
        host    : variables.MySqlhost,
        user    : variables.MySqluser,
        password: variables.MySqlpassword,
        database: variables.MySqldatabase
    },

};

module.exports = setting;
