import MeasuramentService from '../services/MeasurementService';
import BaseController from './BaseController';

class MeasurementController {
  async index(req, res) {
    try {
      const options = {
        patient_id: req.filter.patient_id,
        user_id: req.userId,
        day: req.filter.day,
        page: req.filter.page,
      };
      const measurement = await MeasuramentService.index(options);
      return BaseController.handleResponse(res, measurement);
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async listChart(req, res) {
    try {
      const options = {
        patient_id: req.filter.patient_id,
        user_id: req.userId,
        startDay: req.filter.startDay,
        endDay: req.filter.endDay,
      };

      const measurement = await MeasuramentService.listChart(options);
      return BaseController.handleResponse(res, measurement);
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async store(req, res) {
    try {
      const measurement = await MeasuramentService.store({
        ...req.data,
        patient_id: req.filter.patient_id,
      }, req.filter.patient_id, req.userId);
      return BaseController.handleResponse(res, measurement);
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async show(req, res) {
    try {
      const measutement = await MeasuramentService.show(req.filter.id, req.filter.patient_id, req.userId);
      return res.json(measutement);
    } catch (e) {
      return BaseController.handleError(res, { errors: ['Page not found'] });
    }
  }

  async update(req, res) {
    try {
      const meas = await MeasuramentService.update(req.data, req.filter.id, req.filter.patient_id, req.userId);
      return BaseController.handleResponse(res, meas);
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }

  async delete(req, res) {
    try {
      await MeasuramentService.delete(req.filter.id, req.filter.patient_id, req.userId);
      return BaseController.handleResponse(res, { medicao: 'deletada' });
    } catch (e) {
      return BaseController.handleError(res, e);
    }
  }
}

export default new MeasurementController();
