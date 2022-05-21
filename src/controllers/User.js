import UserService from '../services/UserService';

class UserController {
  async store(req, res) {
    if (!req.data) {
      return res.status(400).json({ errors: ['Favor preencher os campos obrigatorios'] });
    }

    try {
      const newUser = await UserService.store(req.data);

      return res.json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      if (req.filter.id) {
        const user = await UserService.show(req.filter.id);
        return res.json(user);
      }
      const users = await UserService.index();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.data) {
        res.status(400).json({ errors: ['Favor preencher pelo menos um campo'] });
      }

      await UserService.update(req.data, req.userId);
      return res.json('Usuario atualizado');
    } catch (e) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      await UserService.delete(req.userId);

      return res.json({ usuario: 'deletado' });
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
