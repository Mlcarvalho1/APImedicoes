import Sequelize, { Model } from 'sequelize';
import Patient from './Patient';

export default class Measurement extends Model {
  static init(sequelize) {
    super.init({
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
      measurement_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      paranoid: true,
      modelName: 'measurement',
      tableName: 'measurements',
      deletedAt: 'deleted_at',
      scopes: {
        ofLoggedUser: (userId) => ({
          include: {
            model: Patient,
            where: {
              user_id: userId,
            },
            attributes: [],
          },
        }),
      },
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.patient, { foreignKey: 'patient_id' });
  }
}
