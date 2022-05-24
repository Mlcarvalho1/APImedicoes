import User from '../models/User';

export default {
  store: async (data) => {
    const user = await User.findOne({
      attributes: ['name', 'email'],
      where: {
        email: data.email,
      },
    });

    if (user) {
      return { errors: ['Usuario ja cadastrado'] };
    }
    const { name, id, email } = await User.create(data);
    return { name, id, email };
  },
  show: async (id) => {
    const user = await User.findByPk(id, {
      attributes: ['name', 'email'],
    });

    if (!user) {
      return { errors: ['Usuario nao encontrado'] };
    }

    return { data: user };
  },

  index: async () => {
    const users = await User.findAll({ attributes: ['name', 'email'] });
    return {
      data: users,
    };
  },

  update: async (data, id) => {
    const user = await User.update(data, {
      where: { id },
    }, {
      returning: true,
    });

    if (!user) {
      return { message: 'usuario não encontrado.' };
    }
    return user;
  },

  delete: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      return { errors: ['Usuario nao existe'] };
    }

    return user.destroy();
  },

};
