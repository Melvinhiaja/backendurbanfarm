'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Farmer User',
        email: 'farmer@example.com',
        password,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Agronomist User',
        email: 'agronomist@example.com',
        password,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
