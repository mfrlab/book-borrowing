const { Sequelize } = require('sequelize')
const Book = require('../models/Book')
const Loan = require('../models/Loan')

exports.availableBook = async function(req, res) {
    const books = await Book.findAll({
        where: {
            status: Book.STATUS.AVAILABLE
        }
    })

    res.render('display_book', {
        books: books
    })
}

exports.activeLoan = async function(req, res) {
    const books = await Book.findAll({
        include: [
            {
                model: Loan,
                where: {
                    idMember: req.session.user.id,
                    status: Loan.STATUS.ACTIVE
                },
                attributes: [
                    'id',
                    [Sequelize.fn('date_format', Sequelize.col('loans.loanDate'), '%Y-%m-%d %H:%i:%s'), 'loanDate'],
                    [Sequelize.fn('date_format', Sequelize.col('loans.returnDueDate'), '%Y-%m-%d %H:%i:%s'), 'returnDueDate']
                ]
            }
        ]
    })

    res.render('dashboard_member', {
        user: req.session.user,
        books: books,
        msg: req.flash('msg')
    })
}

exports.borrow = async function(req, res) {
    const existing = await Loan.findOne({
        where: {
            idMember: req.session.user.id,
            status: Loan.STATUS.ACTIVE
        }
    })

    if (existing) {
        req.flash('msg', 'kembalikan buku terlebih dahulu')
        res.redirect('/dashboard')

    } else {
        await Loan.create({
            idMember: req.session.user.id,
            idBook: req.params.idBook,
            loanDate: Date.now(),
            returnDueDate: Date.now() + Loan.THRESHOLD
        })

        const book = await Book.findOne({
            where: {
                id: req.params.idBook
            }
        })

        book.status = Book.STATUS.BORROWED
        await book.save()

        req.flash('msg', 'Berhasil pinjam buku')
        res.redirect('/dashboard')
    }
}

exports.return = async function(req, res) {
    const loan = await Loan.findOne({
        where: {
            id: req.params.id
        }
    })

    const book = await Book.findOne({
        where: {
            id: loan.idBook
        }
    })

    loan.returnDate = Date.now()
    loan.status = Loan.STATUS.INACTIVE
    await loan.save()

    book.status = Book.STATUS.AVAILABLE
    await book.save()

    req.flash('msg', 'Berhasil mengembalikan buku')
    res.redirect('/dashboard')
}