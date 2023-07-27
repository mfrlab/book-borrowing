const { Model, DataTypes } = require('sequelize')
const { db } = require('./index')

class Book extends Model {

}

Book.STATUS = {
    AVAILABLE: 'Available',
    BORROWED: 'Borrowed',
    LOST: 'Lost'
}

Book.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    writer: {
        allowNull: false,
        type: DataTypes.STRING
    },
    publisher: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM,
        values: Object.values(Book.STATUS),
        defaultValue: Book.STATUS.AVAILABLE
    }
}, {
    tableName: 'books',
    sequelize: db,
    timestamps: true
})

module.exports = Book