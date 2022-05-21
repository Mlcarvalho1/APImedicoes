import Sequelize, { Model } from 'sequelize';

export default class Patient extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      borned_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      sequelize,
      paranoid: true,
      modelName: 'patient',
      tableName: 'patients',
      deletedAt: 'deleted_at',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.user, { foreignKey: 'user_id' });
    this.hasMany(models.profile_pic, { foreignKey: 'patient_id' });
    this.hasMany(models.measurement, { foreignKey: 'patient_id' });
  }
}
