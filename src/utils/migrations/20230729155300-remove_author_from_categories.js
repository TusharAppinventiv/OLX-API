// // migrations/YYYYMMDDHHMMSS-remove_author_from_categories.js
// module.exports = {
//   up: async (queryInterface) => {
//     await queryInterface.removeColumn('categories', 'author');
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn('categories', 'author', {
//       type: Sequelize.STRING,
//       allowNull: true,
//     });
//   },
// };
// Vice versa it is removing that field from our categories table