import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Seu nome deve ter no minimo 3 e no maximo 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Este email ja esta sendo utilizado',
        },
        validate: {
          isEmail: {
            msg: 'Email invalido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 50],
            msg: 'A senha deve ter entre 8 e 50 caracteres',
          },
        },
      },
      password_confirmation: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          isPasswordEqual() {
            if (this.password_confirmation !== this.password) {
              throw new Error('senha diferente da confirmacao');
            }
          },
        },
      },
    }, {
      sequelize,
      paranoid: true,
      modelName: 'user',
      tableName: 'users',
      deletedAt: 'deleted_at',

    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.patient, { foreignKey: 'user_id' });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
