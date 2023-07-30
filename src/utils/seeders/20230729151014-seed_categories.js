module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', [
      {
        category_name: 'Electronics',
        subcategories: 'Laptops, Cameras',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Books',
        subcategories: 'Fiction, Mystery',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
