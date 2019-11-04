const express = require('express');
const router = express.Router();

var Chart = require('chart.js');
const pool = require('../database');

module.exports = router;

// *******************Rutas Para Muestras de Datos****************
router.post('/datos', async (req, res) => {
    console.log("entre");
    const { minimo, maximo } = req.body;
    const newDatos = {
        modulo_id: 1,
        cliente_id: 1,
        minimo,
        maximo
    };
    await pool.query('UPDATE cliente_modulo set ?', [newDatos]);
    req.flash('success', 'Materia Prima Creada');
    res.redirect('datos');
});

router.get('/monitoreo_principal', async (req, res) => {
    res.render('monitoreo/principal');
});

router.get('/grafica', async (req, res) => {
    res.render('monitoreo/grafica');
});

router.get('/datos', async (req, res) => {
    res.render('monitoreo/datos');
});


