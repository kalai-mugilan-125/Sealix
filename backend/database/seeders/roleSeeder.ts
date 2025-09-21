import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      { name: 'issuer', createdAt: new Date(), updatedAt: new Date() },
      { name: 'verifier', createdAt: new Date(), updatedAt: new Date() },
      { name: 'user', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.bulkDelete('Roles', {});
  },
};