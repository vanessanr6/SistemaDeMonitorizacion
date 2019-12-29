const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if (rows.length > 0){
        const user = rows[0]
        if(user.es_admin){
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword){
            done(null, user, req.flash('success', `Bienvenido ${user.username}`))
        } else {
            done(null, false, req.flash('message', 'Contraseña inválida'))
        }
    }else{
        return done(null, false, req.flash('message', 'El usuario no posee acceso de administrador'))
    }
    } 
     else {
        return done(null, false, req.flash('message', 'El usuario no existe'))
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true 
}, async (req, username, password, done) => {
    const { fullname } = req.body
    const newUser = {
        username,
        password,
        fullname,
        es_admin: true
    }
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId
    return done (null, newUser)
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const row = await helpers.getUserById(id)
    done(null, row);
  });

passport.use('local.agregarUsuario', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname, id_cliente, id_usuario } = req.body
    let newUser
    if(id_usuario){
        const users = await pool.query('SELECT * FROM users WHERE id = ?', [id_usuario])
        const currentUser = users[0]
        newUser = {
            username,
            password,
            fullname,
            cliente_id: currentUser.cliente_id,
        }
    } else{
    newUser = {
        username,
        password,
        fullname,
        cliente_id: id_cliente,
        es_clientePrincipal: true
    }}
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    return done (null)
}
))

passport.use('local.ingresar', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if (rows.length > 0){
        const user = rows[0]
        if(!user.es_admin){
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword){
            done(null, user, req.flash('success', `Bienvenido ${user.username}`))
        } else {
            done(null, false, req.flash('message', 'Contraseña inválida'))
        }
    }else{
        return done(null, false, req.flash('message', 'Usted posee usuario de administrador'))
    }
    } 
     else {
        return done(null, false, req.flash('message', 'El usuario no existe'))
    }
}))