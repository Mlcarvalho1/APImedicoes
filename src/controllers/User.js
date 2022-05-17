import User from '../models/User';
// import BaseController from './BaseController';
// import UserService from '../services/UserService';

class UserController {
  // constructor() {
  //   super();

  //   this.storeAction = this.storeAction.bind(this);
  //   // this.index = this.index.bind(this);
  //   // this.store = this.store.bind(this);
  //   // this.store = this.store.bind(this);
  //   // this.store = this.store.bind(this);
  // }

  async store(req, res) {
    try {
      const data = req.body;
      const { name, email, id } = await User.create(data);
      // const { email, name, id } = await UserService.store(data);

      return res.json({ name, email, id });
      // this.handleResponse(res, { email, name, id });
    } catch (e) {
      // this.handleError(res, e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuario n existe'],
        });
      }

      const {
        name, email, id,
      } = await user.update(req.body);
      return res.json({
        name, email, id,
      });
    } catch (e) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario n existe'],
        });
      }

      await user.destroy(req.body);
      return res.json(user.name);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
