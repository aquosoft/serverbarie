const mysql = require('mysql');
// const config = require('./config');
const  setting   = require ('../../src/settingServer');
const { object } = require('prop-types');

let resultado = {
    cod:0,
    respuesta:'',
    fields:null,
    rows:null,
    columns:[]
}

var Sp = {
    EjecutarSp: function(Nombre,Parametros,cb){
        let cnn = mysql.createConnection(setting.mysqlData);
        cnn.connect(function(error){
            if(error){
                console.log(error);
                resultado = {
                    cod: error.code,
                    respuesta: error,
                    fields:null,
                    rows:null,
                    columns:[]
                }
                return;
            } console.log('Connection established');
        });

        Parametros = Parametros ? Parametros : '';
        let arrParametros = Object.keys(Parametros);
        var paramsViews = '';
        for (let i = 0; i < arrParametros.length; i++) {
            paramsViews = paramsViews + '?,'        
        } 
        let unSp= Nombre+'('+paramsViews.substr(0,paramsViews.length-1)+')';
        
        let sql = 'CALL '+unSp
        if (setting.verCall) console.log('CALL '+Nombre+'('+Object.values(Parametros)+')');
        cnn.query(sql, Object.values(Parametros), (error, results, fields) => {
            if (error) {
                console.log(error)
                resultado = {
                    cod: error.code,
                    respuesta: error,
                    fields:null,
                    rows:null,
                    columns:[]
                }
                cb(resultado);
                return
            } else {
                resultado = {
                    cod:10, //ok
                    respuesta: '',
                    fields:results[1],
                    rows:results[0],
                    columns:[]
                }          
            }
            if (setting.verResultado) console.log(JSON.stringify(resultado));
            cb(resultado);
           
        });
        
        cnn.end();

    }
}
module.exports = Sp;