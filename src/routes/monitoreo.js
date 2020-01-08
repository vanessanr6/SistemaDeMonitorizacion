const express = require('express');
const router = express.Router();

var Chart = require('chart.js');
const pool = require('../database');
const { clientIsLoggedIn, clientIsNotLoggedIn } = require('../lib/auth')

// *******************Rutas Para Muestras de Datos****************

router.post('/', clientIsLoggedIn, async (req, res) => {
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

router.get('/principal', clientIsLoggedIn,  async (req, res) => {
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    
    res.render('monitoreo/principal', {minandmax});
});

router.get('/distancia', clientIsLoggedIn,  async (req, res) => {
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    
    res.render('Distancia/principal', {minandmax});
});
router.get('/humedad', clientIsLoggedIn,  async (req, res) => {
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    res.render('Humedad/principal', {minandmax});
});

router.post('/principal', async (req, res) => {
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
    res.redirect('principal');
});
router.get('/graficaDist', async (req, res) => {
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    res.render('Distancia/grafica', {minandmax});
});

router.post('/graficaDist', async (req, res) => {
    const { minimo, maximo } = req.body;
    const newDatos = {
        modulo_id: 1,
        cliente_id: 1,
        minimo,
        maximo
    };
    await pool.query('UPDATE cliente_modulo set ?', [newDatos]);
    res.redirect('principal');
});
router.get('/graficaHume', async (req, res) => {
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    res.render('Humedad/grafica', {minandmax});
});

router.post('/graficaHume', async (req, res) => {
    const { minimo, maximo } = req.body;
    const newDatos = {
        modulo_id: 1,
        cliente_id: 1,
        minimo,
        maximo
    };
    await pool.query('UPDATE cliente_modulo set ?', [newDatos]);
    res.redirect('principal');
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

module.exports = router;