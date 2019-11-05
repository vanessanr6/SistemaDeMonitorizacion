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
  var data = JSON.parse(JSON.stringify(req.body));
  console.log(data);
  console.log(data.cliente)

  httpMsgs.sendJSON(req, res, {
    from : "Server"
  });
});

router.get('/monitoreo_principal', async (req, res) => {
    res.render('monitoreo/principal');
    }); 

