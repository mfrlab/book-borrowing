const { Model, DataTypes } = require('sequelize')
const { db } = require('./index')

class Loan extends Model {

}

Loan.STATUS = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
}

Loan.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idMember: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    idBook: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    loanDate: {
        allowNull: false,
        type: DataTypes.DATE
    },
    returnDueDate: {
        allowNull: false,
        type: DataTypes.DATE
    },
    returnDate: {
        allowNull: true,
        type: DataTypes.DATE
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: Object.values(Loan.STATUS),
        defaultValue: Loan.STATUS.ACTIVE
    }
}, {
    tableName: 'loans',
    sequelize: db,
    timestamps: true
})

module.exports = Loan