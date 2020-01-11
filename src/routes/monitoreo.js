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
    const modulos =  await pool.query('SELECT `modulo_id` FROM `cliente_modulo` WHERE cliente_modulo.cliente_id = ? ORDER BY `modulo_id` ASC ',req.user.cliente_id);
    var prueba=0;
    modulos.forEach(modulo => {
        if(modulo.modulo_id==1){
            prueba = 1;
        }

    });
    if(prueba==1){
        const minandmax = await pool.query('SELECT * FROM `cliente_modulo` WHERE cliente_modulo.modulo_id = ? AND cliente_modulo.cliente_id = ? ',[1,req.user.cliente_id]);
        console.log(req.body)
        res.render('monitoreo/principal', {minandmax});
    }else{
        
        res.render('noAcceso/sinAcceso');
    }
   
});

router.get('/distancia', clientIsLoggedIn,  async (req, res) => {
    const modulos =  await pool.query('SELECT `modulo_id` FROM `cliente_modulo` WHERE cliente_modulo.cliente_id = ? ORDER BY `modulo_id` ASC ',req.user.cliente_id);
    var prueba=0;
    modulos.forEach(modulo => {
        if(modulo.modulo_id==3){
            prueba = 1;
        }

    });
    if(prueba==1){
    const minandmax = await pool.query('SELECT * FROM `cliente_modulo` WHERE cliente_modulo.modulo_id = ? AND cliente_modulo.cliente_id = ? ',[3,req.user.cliente_id]);
    
    res.render('Distancia/principal', {minandmax});
}else{
        
    res.render('noAcceso/sinAcceso');
}
});
router.get('/humedad', clientIsLoggedIn,  async (req, res) => {
    const modulos =  await pool.query('SELECT `modulo_id` FROM `cliente_modulo` WHERE cliente_modulo.cliente_id = ? ORDER BY `modulo_id` ASC ',req.user.cliente_id);
    var prueba=0;
    modulos.forEach(modulo => {
        if(modulo.modulo_id==2){
            prueba = 1;
        }

    });
    if(prueba==1){
    const minandmax = await pool.query('SELECT * FROM `cliente_modulo` WHERE cliente_modulo.modulo_id = ? AND cliente_modulo.cliente_id = ? ',[2,req.user.cliente_id]);
    res.render('Humedad/principal', {minandmax});
}else{
        
    res.render('noAcceso/sinAcceso');
}
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
    const modulos =  await pool.query('SELECT `modulo_id` FROM `cliente_modulo` WHERE cliente_modulo.cliente_id = ? ORDER BY `modulo_id` ASC ',req.user.cliente_id);
    var prueba=0;
    modulos.forEach(modulo => {
        if(modulo.modulo_id==1){
            prueba = 1;
        }

    });
    if(prueba==1){
    const minandmax = await pool.query('SELECT * FROM `cliente_modulo` WHERE cliente_modulo.modulo_id = ? AND cliente_modulo.cliente_id = ? ',[1,req.user.cliente_id]);
    
    res.render('monitoreo/grafica', {minandmax});
}else{
        
    res.render('noAcceso/sinAcceso');
}
});

router.post('/grafica', async (req, res) => {
    const { minimo, maximo } = req.body;
   
    await pool.query('UPDATE `cliente_modulo` SET `minimo`= ?,`maximo`= ? WHERE `modulo_id` = ? AND `cliente_id` = ?', [minimo,maximo,1, req.user.cliente_id]);
    
    res.redirect('principal');
});
router.get('/graficaDist', async (req, res) => {
    const modulos =  await pool.query('SELECT `modulo_id` FROM `cliente_modulo` WHERE cliente_modulo.cliente_id = ? ORDER BY `modulo_id` ASC ',req.user.cliente_id);
    var prueba=0;
    modulos.forEach(modulo => {
        if(modulo.modulo_id==3){
            prueba = 1;
        }

    });
    if(prueba==1){
    const minandmax = await pool.query('SELECT * FROM `cliente_modulo` WHERE cliente_modulo.modulo_id = ? AND cliente_modulo.cliente_id = ? ',[3,req.user.cliente_id]);
    res.render('Distancia/grafica', {minandmax});
}else{
        
    res.render('noAcceso/sinAcceso');
}
});

router.post('/graficaDist', async (req, res) => {
    const { minimo, maximo } = req.body;
   
    await pool.query('UPDATE `cliente_modulo` SET `minimo`= ?,`maximo`= ? WHERE `modulo_id` = ? AND `cliente_id` = ?', [minimo,maximo,3, req.user.cliente_id]);
    console.log(minimo);
    res.redirect('distancia');
});
router.get('/graficaHume', async (req, res) => {
    const modulos =  await pool.query('SELECT `modulo_id` FROM `cliente_modulo` WHERE cliente_modulo.cliente_id = ? ORDER BY `modulo_id` ASC ',req.user.cliente_id);
    var prueba=0;
    modulos.forEach(modulo => {
        if(modulo.modulo_id==2){
            prueba = 1;
        }

    });
    if(prueba==1){
    const minandmax = await pool.query('SELECT * FROM `cliente_modulo` WHERE cliente_modulo.modulo_id = ? AND cliente_modulo.cliente_id = ? ',[2,req.user.cliente_id]);
    res.render('Humedad/grafica', {minandmax});
}else{
        
    res.render('noAcceso/sinAcceso');
}
});

router.post('/graficaHume', async (req, res) => {
    const { minimo, maximo } = req.body;
   
    await pool.query('UPDATE `cliente_modulo` SET `minimo`= ?,`maximo`= ? WHERE `modulo_id` = ? AND `cliente_id` = ?', [minimo,maximo,2, req.user.cliente_id]);
   
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