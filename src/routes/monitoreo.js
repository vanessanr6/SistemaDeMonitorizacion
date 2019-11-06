const express = require('express');
const router = express.Router();

var Chart = require('chart.js');
const pool = require('../database');

module.exports = router;

// *******************Rutas Para Muestras de Datos****************

router.get('/monitoreo_principal', async (req, res) => {
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    res.render('monitoreo/principal', {minandmax});
});

router.post('/monitoreo_principal', async (req, res) => {
    const { minimo, maximo } = req.body;
    const newDatos = {
        modulo_id: 1,
        cliente_id: 1,
        minimo,
        maximo
    };
    await pool.query('UPDATE cliente_modulo set ?', [newDatos]);
    res.redirect('monitoreo_principal');
});


router.get('/grafica', async (req, res) => {
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    res.render('monitoreo/grafica', {minandmax});
});

router.post('/grafica', async (req, res) => {
    const { minimo, maximo } = req.body;
    const newDatos = {
        modulo_id: 1,
        cliente_id: 1,
        minimo,
        maximo
    };
    await pool.query('UPDATE cliente_modulo set ?', [newDatos]);
    res.redirect('grafica');
});

// router.get('/datos', async (req, res) => {
//     const minandmax = await pool.query('SELECT * FROM cliente_modulo');
//     res.render('monitoreo/datos', {minandmax});
// });


// router.post('/datos', async (req, res) => {
//     console.log("entre");
//     const { minimo, maximo } = req.body;
//     console.log(req.body);
//     const newDatos = {
//         modulo_id: 1,
//         cliente_id: 1,
//         minimo,
//         maximo
//     };
//     await pool.query('UPDATE cliente_modulo set ?', [newDatos]);
//     res.redirect('datos');
// });
