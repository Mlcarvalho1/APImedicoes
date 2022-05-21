import PatientService from '../services/PatientService';

class PatientController {
  async index(req, res) {
    try {
      const patients = await PatientService.index(req.userId);
      res.json(patients);
    } catch (e) {
      console.log(e);
    }
  }

  async store(req, res) {
    try {
      const patient = await PatientService.store({
        ...req.data,
        user_id: req.userId,
      });
      return res.json(patient);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user_id = req.userId;
      const ID = req.filter.id;
      const patient = await PatientService.show(ID, user_id);

      return res.json(patient);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.mensage),
      });
    }
  }

  async delete(req, res) {
    try {
      const ID = req.filter.id;
      const userID = req.userId;
      await PatientService.delete(ID, userID);
      return res.json({
        Paciente_apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.mensage),
      });
    }
  }

  async update(req, res) {
    try {
      const ID = req.filter.id;
      const user_id = req.userId;

      await PatientService.update(req.data, ID, user_id);

      return res.json('Paciente atualizado');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.mensage),
      });
    }
  }
}

export default new PatientController();
