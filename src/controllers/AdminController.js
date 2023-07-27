const { Sequelize } = require('sequelize')
const Book = require('../models/Book')
const Loan = require('../models/Loan')

exports.list = async function(req, res) {
    const books = await Book.findAll({
        include: {
            model: Loan,
            attributes: [
                'id',
                [Sequelize.fn('date_format', Sequelize.col('loans.loanDate'), '%Y-%m-%d %H:%i:%s'), 'loanDate'],
                [Sequelize.fn('date_format', Sequelize.col('loans.returnDueDate'), '%Y-%m-%d %H:%i:%s'), 'returnDueDate'],
                [Sequelize.fn('date_format', Sequelize.col('loans.returnDate'), '%Y-%m-%d %H:%i:%s'), 'returnDate']
            ]
        }
    })

    res.render('dashboard_admin', {
        user: req.session.user,
        books: books,
        msg: req.flash('msg')
    })
    
}