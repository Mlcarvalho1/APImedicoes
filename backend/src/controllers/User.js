import UserService from '../services/UserService';
import BaseController from './BaseController';

class UserController {
  async store(req, res) {
    console.log('oaspdospadop');
    if (!req.data) {
      return res.status(400).json({ errors: ['Favor preencher os campos obrigatorios'] });
    }

    try {
      const newUser = await UserService.store(req.data);

      return BaseController.handleResponse(res, newUser);
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async index(req, res) {
    try {
      if (req.filter.id) {
        const user = await UserService.show(req.filter.id);
        return BaseController.handleResponse(res, user);
      }
      const users = await UserService.index();
      return BaseController.handleResponse(res, users);
    } catch (e) {
      return BaseController.handleError(res, null);
    }
  }

  async update(req, res) {
    try {
      if (!req.data) {
        res.status(400).json({ errors: ['Favor preencher pelo menos um campo'] });
      }

      await UserService.update(req.data, req.userId);
      return BaseController.handleResponse(res, 'Usuario atualizado');
    } catch (e) {
      return BaseController.handleError(res, null);
    }
  }

  async delete(req, res) {
    try {
      await UserService.delete(req.userId);

      return BaseController.handleResponse(req, { usuario: 'deletado' });
    } catch (e) {
      return BaseController.handleError(res, null);
    }
  }
}

export default new UserController();
