const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser')
require('./common');
const comandos = require('./comando');
const app = express();
const open = require('open');
const setting   = require ('./src/settingServer');

app.use(cors());
app.options('*', cors());

/**comandos*/
require("./comandos_sistema/comando_persist");


app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const HOST = setting.HOST;//'190.247.169.171';
const PORT = setting.PORT;//'3007'

app.listen(PORT, function() {
  console.log('Servidor web escuchando en el puerto {0}'.format(PORT));
});

function makeIdentityFromRequest(req) {
    return {
        token: '',
    };
}

app.options('/ws', cors());
app.post('/ws', cors(), function(req, res) {
    var identity = makeIdentityFromRequest(req);

    if (comandos.esCommando(req.body.ws)) {

        comandos.ejecutar(identity, req.body.ws, function(result) {
            delete result.fields;
            delete result.columns;
            delete result.respuesta;
            responderJSON(res, result);
        }, req.body.args);
    }
    else
        throw 'WS invalido';
});

const PDFDocument = require('pdfkit');
const fs = require('fs');
const { arch } = require('process');



app.options('/crearPdfPractica', cors());
app.get('/crearPdfPractica', cors(), function(req, res) {
    var identity = makeIdentityFromRequest(req);

    if (comandos.esCommando('ObtenerUltimoContador')) {
        comandos.ejecutar(identity, 'LimpiarDirectorioTemporal', function(result) {

        },{});    
        comandos.ejecutar(identity, 'ObtenerUltimoContador', function(result) {
            let resultado = result.rows[0].CantidadActual;
            let nro = parseInt(resultado) + 1;
            console.log('ultimoPdfCreado: {0}'.format(resultado));
            let pdfDoc = new PDFDocument;

            let dir = __dirname + '/public/tmp/';
            let archPdf = `PdfPractica_${nro}.pdf`;
            let pathPdf = `${dir}${archPdf}`;
            
            pdfDoc.pipe(fs.createWriteStream(pathPdf));
            
            pdfDoc.image('fondoPractica.png', 0, 0, 0);     
            
            pdfDoc.fontSize(24);
            pdfDoc.text("{0}".format(nro),10,10);            
            pdfDoc.text("{0}".format(nro),100,10);
          

            pdfDoc.end();

            let psf = {
                Detalle : pathPdf,
                unTipo : 3
            }
            comandos.ejecutar(identity, 'ActualizarContador', function(result) {
                let url = `http://${HOST}:${PORT}/tmp/${archPdf}`;
                responderJSON(res, url);
            },psf);    

            
        }, {unTipo:3});
    }
    else
        throw 'WS invalido';
});

app.options('/crearPdfConsulta', cors());
app.get('/crearPdfConsulta', cors(), function(req, res) {
    var identity = makeIdentityFromRequest(req);

    if (comandos.esCommando('ObtenerUltimoContador')) {
        comandos.ejecutar(identity, 'LimpiarDirectorioTemporal', function(result) {

        },{});    
        comandos.ejecutar(identity, 'ObtenerUltimoContador', function(result) {
            let resultado = result.rows[0].CantidadActual;
            let nro = parseInt(resultado) + 1;
            console.log('ultimoPdfCreado: {0}'.format(resultado));
            let pdfDoc = new PDFDocument;

            let dir = __dirname + '/public/tmp/';
            let archPdf = `PdfConsulta_${nro}.pdf`;
            let pathPdf = `${dir}${archPdf}`;
            
            pdfDoc.pipe(fs.createWriteStream(pathPdf));
            
            pdfDoc.image('fondoConsulta.png', 0, 0, 0);     
            
            pdfDoc.fontSize(24);
            pdfDoc.text("{0}".format(nro),10,10);            
            pdfDoc.text("{0}".format(nro),100,10);
          

            pdfDoc.end();

            let psf = {
                Detalle : pathPdf,
                unTipo : 2
            }
            comandos.ejecutar(identity, 'ActualizarContador', function(result) {
                let url = `http://${HOST}:${PORT}/tmp/${archPdf}`;
                responderJSON(res, url);
            },psf);    

            
        }, {unTipo:2});
    }
    else
        throw 'WS invalido';
});

app.options('/crearPdfFarmacia', cors());
app.get('/crearPdfFarmacia', cors(), function(req, res) {
    var identity = makeIdentityFromRequest(req);

    if (comandos.esCommando('ObtenerUltimoContador')) {
        comandos.ejecutar(identity, 'LimpiarDirectorioTemporal', function(result) {

        },{});    
        comandos.ejecutar(identity, 'ObtenerUltimoContador', function(result) {
            let resultado = result.rows[0].CantidadActual;
            let nro = parseInt(resultado) + 1;
            console.log('ultimoPdfCreado: {0}'.format(resultado));
            let pdfDoc = new PDFDocument;

            let dir = __dirname + '/public/tmp/';
            let archPdf = `PdfFarmacia_${nro}.pdf`;
            let pathPdf = `${dir}${archPdf}`;
            
            pdfDoc.pipe(fs.createWriteStream(pathPdf));
            
            pdfDoc.image('fondoFarmacia.png', 0, 0, 0);     
            
            pdfDoc.fontSize(24);
            pdfDoc.text("{0}".format(nro),10,10);            
            pdfDoc.text("{0}".format(nro),100,10);
          
            pdfDoc.end();

            let psf = {
                Detalle : pathPdf,
                unTipo : 1
            }
            comandos.ejecutar(identity, 'ActualizarContador', function(result) {
                let url = `http://${HOST}:${PORT}/tmp/${archPdf}`;
                responderJSON(res, url);
            },psf);    

            
        }, {unTipo:1});
    }
    else
        throw 'WS invalido';
});

function responderJSON(res, data) {
    var r_json = JSON.stringify(data);
    res.writeHead(200, {
        'Content-type': 'application/json',
        'Content-Length': Buffer.byteLength(r_json),
    });
    res.write(r_json);
    res.end();
}



            // pdfDoc
            //     .fillColor('blue')
            //     .text("This is a link", { link: 'https://pdfkit.org/docs/guide.pdf', underline: true });
            // pdfDoc
            //     .fillColor('black')
            //     .text("This text is underlined", { underline: true });
            // pdfDoc.text("This text is italicized", { oblique: true });
            // pdfDoc.text("This text is striked-through", { strike: true });
            // let lorem = "aca un texto random"
            // pdfDoc.fontSize(8);
            // pdfDoc.text(`This text is left aligned. ${lorem}`, {
            //   width: 410,
            //   align: 'left'
            // });
            
            // pdfDoc.moveDown();
            // pdfDoc.text(`This text is centered. ${lorem}`, {
            //   width: 410,
            //   align: 'center'
            // });
            
            // pdfDoc.moveDown();
            // pdfDoc.text(`This text is right aligned. ${lorem}`, {
            //   width: 410,
            //   align: 'right'
            // }
            // );
            
            // pdfDoc.moveDown();
            // pdfDoc.text(`This text is justified. ${lorem}`, {
            //   width: 410,
            //   align: 'justify'
            // });

            // let myArrayOfItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

            // pdfDoc.list(myArrayOfItems);
            // // Move down a bit to provide space between lists
            // pdfDoc.moveDown(0.5);
            
            // let innerList = ['Nested Item 1', 'Nested Item 2'];
            // let nestedArrayOfItems = ['Example of a nested list', innerList];
            
            // pdfDoc.list(nestedArrayOfItems);
            // pdfDoc.moveDown(5);            
            // pdfDoc.font('ZapfDingbats').text('This is a symbolic font.');
            // pdfDoc.font('Times-Roman').fontSize(25).fillColor('blue').text('You can set a color for any font');
            // pdfDoc.font('Courier').fontSize(5).fillColor('black').text('Some text to demonstrate.');
            
            
            // // draw bounding rectangle
            // pdfDoc.rect(pdfDoc.x, 200, 310, pdfDoc.y).stroke();

