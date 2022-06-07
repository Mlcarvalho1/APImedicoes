import PatientService from '../services/PatientService';
import BaseController from './BaseController';

class PatientController {
  async index(req, res) {
    try {
      const patients = await PatientService.index(req.userId);
      return BaseController.handleResponse(res, patients);
    } catch (e) {
      return BaseController.handleError(res, 'ocorreu um erro inesperado');
    }
  }

  async store(req, res) {
    try {
      const patient = await PatientService.store({
        ...req.data,
        user_id: req.userId,
      });
      return BaseController.handleResponse(res, patient);
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async show(req, res) {
    try {
      const user_id = req.userId;
      const ID = req.filter.id;
      const patient = await PatientService.show(ID, user_id);

      return BaseController.handleResponse(res, patient);
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async delete(req, res) {
    try {
      const ID = req.filter.id;
      const userID = req.userId;
      await PatientService.delete(ID, userID);
      return BaseController.handleResponse(res, { patiente_apagado: true });
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async update(req, res) {
    try {
      const ID = req.filter.id;
      const user_id = req.userId;

      await PatientService.update(req.data, ID, user_id);

      return BaseController.handleResponse(res, { patiente_atualizado: true });
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }
}

export default new PatientController();
