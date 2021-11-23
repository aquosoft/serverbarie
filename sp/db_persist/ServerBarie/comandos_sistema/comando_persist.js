const comandos = require('../comando');
const Sp = require('./database/ejecutar_sp')
var fs = require("fs");
var path = require('path');
var async = require('async');
const tmpFolder = 'public/tmp/';




comandos.registrar({
    name: 'ObtenerUltimoContador',
    ejecutar: function (identity, cb, args) {
        Sp.EjecutarSp('pa_contadorpdf_Leer',args,function(data){
            cb(data);
        })

    }
});

comandos.registrar({
    name: 'ActualizarContador',
    ejecutar: function (identity, cb, args) {
        Sp.EjecutarSp('pa_contadorpdf_Actualizar',args,function(data){
            cb(data);
        })
    }
});

comandos.registrar({
    name: 'LimpiarDirectorioTemporal',
    ejecutar: function(identity, cb, args) {
        findAndRemoveOldFiles(tmpFolder,20,function(data){
            cb({header: {cod:10}})
        });
    }
});



function findAndRemoveOldFiles(inputDir, keepCount, callback) {
    debugger;
    if(!callback) {
        callback = function (err, removeFiles) {
            // default callback: doing nothing
        };
    };

    fs.readdir(inputDir, function (err, files) {
        debugger;
        if(err) {
            return callback(err);
        }

        fileNames = files.map(function (fileName) {
            return path.join(inputDir, fileName);   
        });

        async.map(fileNames, function (fileName, cb) {
            debugger;
            fs.stat(fileName, function (err, stat) {
                debugger;
                if(err) {
                    return cb(err);
                };

                cb(null, {
                    name: fileName,
                    isFile: stat.isFile(),
                    time: stat.mtime,
                });
            });
        }, function (err, files) {
            debugger;
            if(err) {
                return callback(err);
            };

            files = files.filter(function (file) {
                return file.isFile;
            })

            files.sort(function (filea, fileb) {
                //return fileb.time > filea.time;
                return fileb.time - filea.time;
            });

            files = files.slice(keepCount);

            async.map(files, function (file, cb) {
                debugger;
                fs.unlink(file.name, function (err) {
                    debugger;
                    if(err) {
                        return cb(err);
                    };

                    cb(null, file.name);
                });
            }, function (err, removedFiles) {
                debugger;
                if(err) {
                    return callback(err);
                }
                callback(null, removedFiles);
            });
        });
    });
}