const express = require("express");
const app = express();
const pool = require("../database");
const helpers = require("../lib/helpers");

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: "",
};

app.get("/usuario_api_add", async function (req, res) {

    const newUser = {
        username : "",
        password : "",
        fullname : "",
        cliente_id: 0,
        es_admin: null,
        es_clientePrincipal: null
    };

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: "",
    };

    if (
        req.query.username == null ||
        req.query.password == null ||
        req.query.fullname == null || 
        req.query.cliente_id == null ||
        req.query.es_main == null
    ) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: "Datos indefinidos",
        };
        res.status(500).send(respuesta);
        return false;
    }

    //Asignando datos user
    newUser.username = req.query.username;
    newUser.password = req.query.password;
    newUser.fullname = req.query.fullname;
    newUser.cliente_id = req.query.cliente_id;
    if( req.query.es_main == 1){
        newUser.es_clientePrincipal = true;
    }

    if (newUser.username === "" || newUser.password === "" || newUser.fullname === "" || newUser.cliente_id == 0) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: "El usuario no ha sido creado",
        };
    } else {
        // Primero Insertare Cliente
        try {
            newUser.password = await helpers.encryptPassword(newUser.password);
            const result = await pool.query("INSERT INTO users SET ?", [newUser]);
            newUser.id = result.insertId;
        } catch (error) {
            console.log(error);
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: "El usuario no ha sido creado",
            };
            res.status(500).send(respuesta);
            return false;
        }
        
        respuesta = newUser ;
    }
    res.send(respuesta);
});


app.get("/cliente_api_add", async function (req, res) {

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: "",
    };

    const nuevoCliente = {
        nombre : "",
        direccion : "", 
        telefono : "",
        rubro : "",
        fecha : "",
        correo : ""
      }

      if (
        req.query.nombre == null ||
        req.query.direccion == null ||
        req.query.telefono == null || 
        req.query.rubro == null ||
        req.query.fecha == null ||
        req.query.correo == null
    ) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: "Datos indefinidos",
        };
        res.status(500).send(respuesta);
        return false;
    }

    nuevoCliente.nombre = req.query.nombre;
    nuevoCliente.direccion = req.query.direccion;
    nuevoCliente.telefono = req.query.telefono;
    nuevoCliente.rubro = req.query.rubro;
    nuevoCliente.fecha = req.query.fecha;
    nuevoCliente.correo = req.query.correo;
    let cliente = null;
    try {
         cliente = await pool.query('INSERT INTO clientes SET ?', [nuevoCliente])
    } catch (error) {
        console.log(error);
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: "El cliente no ha sido creado",
            };
            res.status(500).send(respuesta);
            return false;
    }
    
    
      if(req.query.temperatura){
        const temperatura = {
          modulo_id: 1,
          cliente_id: cliente.insertId,
          minimo: 10,
          maximo: 30
        }
        await pool.query('INSERT INTO cliente_modulo SET ?', [temperatura])
      }
      if (req.query.humedad) {
        const humedad = {
          modulo_id: 2,
          cliente_id: cliente.insertId,
          minimo: 10,
          maximo: 30
        }
        await pool.query('INSERT INTO cliente_modulo SET ?', [humedad])
      }
      if(req.query.proximidad){
          console.log("proximidad");
        const proximidad = {
          modulo_id: 3,
          cliente_id: cliente.insertId,
          minimo: 10,
          maximo: 30
        }
        await pool.query('INSERT INTO cliente_modulo SET ?', [proximidad])
      }
    respuesta = nuevoCliente;
    res.send(respuesta);
});


app.get("/ubicacion_api_add", async function (req, res) {

    const newUbicacion = {
        cliente_id : "",
        direccion : "",
        lat : "",
        lon : ""
    };

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: "",
    };

    if (
        req.query.cliente_id == null ||
        req.query.direccion == null ||
        req.query.lat == null || 
        req.query.lon == null 
    ) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: "Datos indefinidos",
        };
        res.status(500).send(respuesta);
        return false;
    }

    //Asignando datos user
    newUbicacion.cliente_id = req.query.cliente_id;
    newUbicacion.direccion = req.query.direccion;
    newUbicacion.lat = req.query.lat;
    newUbicacion.lon = req.query.lon;

    if (newUbicacion.cliente_id === "" || newUbicacion.direccion === "" || newUbicacion.lat === "" || newUbicacion.lon == 0) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: "El usuario no ha sido creado",
        };
    } else {
        // Primero Insertare Cliente
        try {

            const result = await pool.query("INSERT INTO ubicaciones SET ?", [newUbicacion]);

        } catch (error) {

            console.log(error);
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: "El usuario no ha sido creado",
            };
            res.status(500).send(respuesta);
            return false;
        }
        
        respuesta = newUbicacion ;
    }
    res.send(respuesta);
});

app.get("/ubicacion_api_read", async function (req, res) {

    const readUbicacion = {
        cliente_id : ""
    };

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: "",
    };

    if (
        req.query.cliente_id == null 
    ) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: "Datos indefinidos",
        };
        res.status(500).send(respuesta);
        return false;
    }

    //Asignando datos user
    readUbicacion.cliente_id = req.query.cliente_id;

    if (readUbicacion.cliente_id === "") {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: "El usuario no ha sido creado",
        };
    } else {
        let users = [];
        try{

            users = await pool.query('SELECT * FROM ubicaciones WHERE cliente_id = ?', [readUbicacion.cliente_id])
            console.log(users);
        } catch (error) {

            console.log(error);
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: "El usuario no ha sido creado",
            };
            res.status(500).send(respuesta);
            return false;
        }
        
        respuesta = users;
    }
    res.send(respuesta);
});

module.exports = app;
