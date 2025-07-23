'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Roles', null, {});

    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'farmer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'agronomist',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
