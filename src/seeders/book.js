const { db } = require('../models')

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('books', [
        {
          title: 'Laskar Pelangi',
          writer: 'Andrea Hirata',
          publisher: 'Bentang Pustaka',
          status: 'Available',
          createdAt: new Date,
          updatedAt: new Date
        },
        {
            title: 'Sang Pemimpi',
            writer: 'Andrea Hirata',
            publisher: 'Bentang Pustaka',
            status: 'Available',
            createdAt: new Date,
            updatedAt: new Date
          },
      ], {}),
      down: async (queryInterface) => {
        await queryInterface.bulkDelete('books', null, {});
      }
  };