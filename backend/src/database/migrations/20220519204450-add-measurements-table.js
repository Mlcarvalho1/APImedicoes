module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('measurements', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'patients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      glucose: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      carbs: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      insulin: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('measurements');
  },
};
