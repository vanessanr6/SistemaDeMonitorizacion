const express = require('express');
const router = express.Router();
const httpMsgs = require("http-msgs");
const pool = require('../database');
const { clientIsLoggedIn, clientIsNotLoggedIn } = require('../lib/auth')
const passport = require('passport')

module.exports = router;

router.get('/', async (req, res) =>{
  const minandmax = await pool.query('SELECT * FROM cliente_modulo');
  res.render('index', {minandmax});
})

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


router.get('/monitoreo_principal', clientIsLoggedIn, async (req, res) => {
    res.render('monitoreo/principal');
    }); 


    router.get('/ingresar', clientIsNotLoggedIn, (req, res) => {
      res.render('monitoreo/ingresar')
  })
  
  router.post('/ingresar', clientIsNotLoggedIn, (req, res, next) => {
      passport.authenticate('local.ingresar', {
          successRedirect: '/',
          failureRedirect: '/ingresar',
          failureFlash: true
        })(req, res, next);
  })

  router.get('/cerrarsesion', (req, res) => {
    req.logOut();
    res.redirect('/');
  })

  router.get('/usuarios', clientIsLoggedIn, async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM users WHERE cliente_id = ?', [req.user.cliente_id])
    console.log("TCL: req.user.cliente_id", req.user.cliente_id)
    res.render('monitoreo/usuarios', {usuarios})
  })
 
  router.get('/agregar-usuario', clientIsLoggedIn, async(req, res) => {
    res.render('administracion/agregar-usuario')
  })
