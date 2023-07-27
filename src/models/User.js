const { Model, DataTypes } = require('sequelize')
const { db } = require('./index')

class User extends Model {

}

User.ROLE = {
    ADMIN: 'Admin',
    MEMBER: 'Member'
}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    address: {
        allowNull: true,
        type: DataTypes.STRING
    },
    telephone: {
        allowNull: true,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: Object.values(User.ROLE),
        defaultValue: User.ROLE.MEMBER
    }
}, {
    tableName: 'users',
    sequelize: db,
    timestamps: true
})

module.exports = User