module.exports = {
    isLoggedIn(req, res, next){
        if(req.user.es_admin){
        if(req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/signin')
    } else {
        return res.redirect('/')
    }
    },

    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/lista-clientes')
    },

    clientIsLoggedIn(req, res, next){
        if(req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/ingresar')
    },

    clientIsNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/')
    }
}