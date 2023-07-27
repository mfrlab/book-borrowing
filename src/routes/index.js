const { Router } = require('express')
const route = Router()

const Session = require('../middleware/Session')
const UserController = require('../controllers/UserController')
const AdminController = require('../controllers/AdminController')
const MemberController = require('../controllers/MemberController')

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/login', (req, res) => {
    res.render('login', {
        msg: req.flash('msg')
    })
})

route.get('/logout', Session.isAuthenticated, (req, res, next) => {
    UserController.logout(req, res).catch(next)
})

route.get('/register', (req, res) => {
    res.render('register')
})

route.get('/dashboard', Session.isAuthenticatedAsMember, (req, res, next) => {
    MemberController.activeLoan(req, res).catch(next)
})

route.get('/display_book', Session.isAuthenticatedAsMember, (req, res, next) => {
    MemberController.availableBook(req, res).catch(next)
})

route.get('/admin', Session.isAuthenticatedAsAdmin, (req, res, next) => {
    AdminController.list(req, res).catch(next)
})

route.post('/register', (req, res, next) => {
    UserController.register(req, res).catch(next)
})

route.post('/login', (req, res, next) => {
    UserController.login(req, res).catch(next)
})

route.get('/borrow/:idBook', Session.isAuthenticatedAsMember, (req, res, next) => {
    MemberController.borrow(req, res).catch(next)
})

route.get('/return/:id', (req, res, next) => {
    MemberController.return(req, res).catch(next)
})

route.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

module.exports = route