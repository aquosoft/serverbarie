import variables from "./ENV.json";
let setting = {
    mysqlData : {
        host    : variables.MySqlhost,
        user    : variables.MySqluser,
        password: variables.MySqlpassword,
        database: variables.MySqldatabase
    },
    HOST : variables.host,
    PORT : variables.port    
}


export {
    setting
}