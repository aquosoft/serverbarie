import variables from "./ENV.json";
let setting = {
    mysqlData : {
        host    : variables.MySqlhost,
        user    : variables.MySqluser,
        password: variables.MySqlpassword,
        database: variables.MySqldatabase
    },
}


export {
    setting
}