const User = require('../models/User')

exports.isAuthenticated = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

exports.isAuthenticatedAsAdmin = function(req, res, next) {
    if (req.session.user && req.session.user.role == User.ROLE.ADMIN) {
        next()
    } else {
        res.redirect('/login')
    }
}

exports.isAuthenticatedAsMember = function(req, res, next) {
    if (req.session.user && req.session.user.role == User.ROLE.MEMBER) {
        next()
    } else {
        res.redirect('/login')
    }
}