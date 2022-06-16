import Sequelize, { Model } from 'sequelize';

export default class Patient extends Model {
  static init(sequelize) {
    super.init({
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nao pode estar vazio',
          },
        },
      },
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nao pode estar vazio',
          },
        },
      },
      path: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nao pode estar vazio',
          },
        },
      },
    }, {
      sequelize,
      paranoid: true,
      modelName: 'profile_pic',
      tableName: 'profile_pics',
      deletedAt: 'deleted_at',

    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.patient, { foreignKey: 'patient_id', as: 'patients_pic' });
  }
}
