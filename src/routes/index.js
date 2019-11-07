const express = require('express');
const router = express.Router();
const httpMsgs = require("http-msgs");
const pool = require('../database');
module.exports = router;

router.get('/', async (req, res) =>{
  const minandmax = await pool.query('SELECT * FROM cliente_modulo');
  res.render('index', {minandmax});
})

router.get('/agregar-clientes', async (req, res) => {
  res.render('administracion/agregar-clientes');
});

router.get('/lista-clientes', async (req, res) => {
  res.render('administracion/lista-clientes');
});
// router.post("/ajaxdemo", async(req, res)=>{
//   const { modulo_id, cliente_id } = req.body;
//     console.log(req.body);
//     const newDatos = {
//         modulo_id,
//         cliente_id,
//         evento: "alta"
//     };
//     console.log(newDatos)

//   // await pool.query('INSERT reportes set ?', [newDatos]);
//   httpMsgs.sendJSON(req, res, {
//     from : "Server"
//   });
// });


router.get('/monitoreo_principal', async (req, res) => {
    res.render('monitoreo/principal');
    }); 

