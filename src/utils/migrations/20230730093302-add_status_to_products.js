
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'status', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Assuming the default status for products is not sold
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('productsUsers', 'status');
  },
};
