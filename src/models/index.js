const dbConfig = require('../config/database')
const env = process.env.NODE_ENV || 'development'
const Sequelize = require('sequelize')

const db = new Sequelize(dbConfig[env].database, dbConfig[env].username, dbConfig[env].password, {
    host: dbConfig[env].hostname,
    dialect: dbConfig[env].dialect,
    logging: ((sql, timing) => {
        console.log(timing + ' ms' + sql)
    }),
    pool: {
        max: dbConfig[env].max,
        min: dbConfig[env].min,
        acquire: dbConfig[env].acquire,
        idle: dbConfig[env].idle
    }
})

module.exports = {
    db
}

// import model
const User = require('./User')
const Book = require('./Book')
const Loan = require('./Loan')

module.exports = {
    db, User, Book, Loan
}