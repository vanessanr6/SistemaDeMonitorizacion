const express = require('express');
const router = express.Router();
const httpMsgs = require("http-msgs");
const pool = require('../database');
const helpers = require('../lib/helpers')
const passport = require('passport')
const { isLoggedIn } = require('../lib/auth')

router.get('/agregar-clientes', isLoggedIn,  async (req, res) => {
    res.render('administracion/agregar-clientes');
  });
  
  
  router.post('/agregar-clientes', isLoggedIn, async (req, res) => {
    const { nombre, direccion, telefono, rubro, fecha, correo } = req.body
    const nuevoCliente = {
      nombre,
      direccion, 
      telefono,
      rubro,
      fecha,
      correo
    }
    const cliente = await pool.query('INSERT INTO clientes SET ?', [nuevoCliente])
  
    if(req.body.temperatura){
      const temperatura = {
        modulo_id: 1,
        cliente_id: cliente.insertId,
        minimo: 10,
        maximo: 30
      }
      await pool.query('INSERT INTO cliente_modulo SET ?', [temperatura])
    }
    if (req.body.humedad) {
      const humedad = {
        modulo_id: 2,
        cliente_id: cliente.insertId,
        minimo: 10,
        maximo: 30
      }
      await pool.query('INSERT INTO cliente_modulo SET ?', [humedad])
    }
    if(req.body.proximidad){
      const proximidad = {
        modulo_id: 3,
        cliente_id: cliente.insertId,
        minimo: 10,
        maximo: 30
      }
      await pool.query('INSERT INTO cliente_modulo SET ?', [proximidad])
    }
  
    res.redirect('/lista-clientes')
  });
  
  router.get('/lista-clientes', isLoggedIn, async (req, res) => {
    const clientes = await pool.query('SELECT * FROM clientes')
    res.render('administracion/lista-clientes', {clientes});
  });

  router.get('/ver-cliente/:id', async (req, res) => {
      const { id } = req.params
      const cliente = await helpers.getClienteById(id)
      const datosCliente = await pool.query('SELECT clientes.id, clientes.nombre as nombre, clientes.direccion, clientes.telefono, clientes.rubro, clientes.fecha, cliente_modulo.minimo, cliente_modulo.maximo, modulos.nombre as modulo FROM clientes JOIN cliente_modulo on cliente_modulo.cliente_id = clientes.id JOIN modulos on modulos.id = cliente_modulo.modulo_id WHERE clientes.id = ?', id)
      const usuariosCliente = await pool.query('SELECT fullname, username, es_clientePrincipal FROM users WHERE cliente_id = ?', [id])
      res.render('administracion/ver-cliente', {cliente, datosCliente, usuariosCliente})
  })

  router.get('/agregar-usuario/:id', async(req, res) => {
    const {id} = req.params
    const cliente = await helpers.getClienteById(id)
    console.log("TCL: cliente", cliente.id)
    res.render('administracion/agregar-usuario', {cliente})
  })

  router.post('/agregar-usuario',
    passport.authenticate('local.agregarUsuario', {
      successRedirect: '/lista-clientes',
      failureRedirect: '/lista-clientes',
      failureFlash: true
    })
  )

module.exports = router;
  