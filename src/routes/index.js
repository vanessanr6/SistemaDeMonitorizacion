const express = require('express');
const router = express.Router();

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


