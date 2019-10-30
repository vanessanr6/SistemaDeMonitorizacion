const express = require('express');
const router = express.Router();

var Chart = require('chart.js');

module.exports = router;

// *******************Rutas Para Muestras de Datos****************
router.get('/monitoreo_principal', async (req, res) => {
    res.render('monitoreo/principal');
    });

router.get('/grafica', async (req, res) => {
    res.render('monitoreo/grafica');
    });

router.get('/datos', async (req, res) => {
    res.render('monitoreo/datos');
    });

