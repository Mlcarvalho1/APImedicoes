import Sequelize, { Model } from 'sequelize';

export default class Patient extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Idade precisa ser um numero inteiro',
          },
        },
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
      modelName: 'patient',
      tableName: 'patients',
    });

    return this;
  }
}
