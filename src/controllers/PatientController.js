import Patient from '../models/Patient';

class PatientController {
  async index(req, res) {
    const patients = await Patient.findAll();
    res.json(patients);
  }

  async store(req, res) {
    try {
      const data = req.body;
      const patient = await Patient.create(data);

      return res.json(patient);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.mensage),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando id'],
        });
      }

      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(400).json({
          errors: ['paciente nao existe'],
        });
      }

      return res.json(patient);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.mensage),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando id'],
        });
      }

      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(400).json({
          errors: ['paciente nao existe'],
        });
      }

      await patient.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.mensage),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando id'],
        });
      }

      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(400).json({
          errors: ['paciente nao existe'],
        });
      }

      const updatedPatient = await patient.update(req.body);

      return res.json(updatedPatient);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.mensage),
      });
    }
  }
}

export default new PatientController();
