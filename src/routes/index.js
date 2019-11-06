const express = require('express');
const router = express.Router();
const httpMsgs = require("http-msgs");
module.exports = router;

router.get('/', (req, res) => {
  res.render('index');
})

router.get('/agregar-clientes', async (req, res) => {
  res.render('administracion/agregar-clientes');
});

router.get('/lista-clientes', async (req, res) => {
  res.render('administracion/lista-clientes');
});

router.post("/ajaxdemo", function(req, res){
  
  var data = JSON.stringify(req.body);
data = data.replace(/\r?\\/g, ""); //remove '\r' from this String
  var expresionRegular =  /\s*","\s*/;
var arrayDatos = data.split(',')
var arrayDatos = arrayDatos.replace(/\r?\w/g, "")
    console.log( arrayDatos[0] );
   var cliente = data[0]
  // console.log(arrayDatos)

  httpMsgs.sendJSON(req, res, {
    from : "Server"
  });
});

router.get('/monitoreo_principal', async (req, res) => {
    res.render('monitoreo/principal');
    }); 

