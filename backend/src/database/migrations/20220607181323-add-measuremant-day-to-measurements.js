module.exports = {
  up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'measurements',
      'measurement_day',
      Sequelize.STRING,
    );
  },

  down(queryInterface) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'measurements',
      'measurement_day',
    );
  },
};
