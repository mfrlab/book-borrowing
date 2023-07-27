const { db } = require('../models')

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('users', [
        {
          email: 'admin@gmail.com',
          password: '1234abCD',
          name: 'Admin',
          address: 'Surabaya',
          telephone: '08123456789',
          role: 'Admin',
          createdAt: new Date,
          updatedAt: new Date
        },
        {
            email: 'member@gmail.com',
            password: 'abCD1234',
            name: 'Member',
            address: 'Bogor',
            telephone: '08125787907',
            role: 'Member',
            createdAt: new Date,
            updatedAt: new Date
          },
      ], {}),
      down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {});
      }
  };