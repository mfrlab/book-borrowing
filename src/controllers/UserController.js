const { check, validationResult } = require('express-validator')
const { User } = require('../models')

exports.register = async function(req, res) {
    await check('name', 'Nama tidak valid').notEmpty().isAlpha().run(req)
    await check('email', 'Email tidak valid').notEmpty().isEmail().custom( async value => {
        const user = await User.findOne({
            where: {email: value}
        })
        if (user) {
            throw new Error('Email already in use');
        }
    }).run(req)
    await check('password', 'Password tidak valid').notEmpty().matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/).run(req)
    await check('telephone', 'Telephone tidak valid').isInt().run(req)
    await check('address', 'Address tidak valid').isString().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
        res.render('register', {
            title: 'Form register',
            errors: result.array()
        })

    } else {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            telephone: req.body.telephone,
            address: req.body.address
        })

        req.flash('msg', 'berhasil register')
        res.redirect('/login')
    }
}

exports.login = async function(req, res) {
    await check('email', 'Nama tidak valid').notEmpty().isEmail().run(req)
    await check('password', 'Password tidak valid').notEmpty().matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/).run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
        res.render('login', {
            title: 'Form login',
            errors: result.array(),
            msg: req.flash('msg')
        })

    } else {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            res.render('login', {
                title: 'Form login',
                errors: [
                    {
                        msg: 'not found'
                    }
                ],
                msg: req.flash('msg')
            })

        } else if (user.password !== req.body.password) {
            res.render('login', {
                title: 'Form login',
                errors: [
                    {
                        msg: 'Invalid credentials'
                    }
                ],
                msg: req.flash('msg')
            })
        
        } else {
            req.session.regenerate(function(err) {
                if (err) next(err)

                req.session.user = user

                req.session.save(function(err) {
                    if(err) return next(err)

                    if (user.role == 'Member') {
                        req.flash('msg', 'Hi Member ' + user.name)
                        res.redirect('/dashboard')

                    } else if (user.role == 'Admin') {
                        req.flash('msg', 'Hi Admin ' + user.name)
                        res.redirect('/admin')
                    }
                    
                })
            })
        }
    }
}

exports.logout = async function(req, res) {
    req.session.destroy(function() {
        res.redirect('/login')
    })
}