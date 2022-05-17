import Patient from '../models/Patient';
import User from '../models/User';

class PatientController {
  async index(req, res) {
    const user = await User.findByPk(req.userId, {
      include: { association: 'patients' },
    });

    res.json(user);
  }

  async store(req, res) {
    try {
      const {
        name, age, weight, height,
      } = req.body;
      const user = await User.findByPk(req.userId);
      const user_id = req.userId;
      if (!user) {
        return res.status(400).json({
          errors: ['Usuario n existente'],
        });
      }

      const patient = await Patient.create({
        name,
        age,
        weight,
        height,
        user_id,
      });

      return res.json(patient);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // async show(req, res) {
  //   try {
  //     const { id } = req.params;

  //     if (!id) {
  //       return res.status(400).json({
  //         errors: ['Faltando id'],
  //       });
  //     }

  //     const patient = await Patient.findByPk(id);

  //     if (!patient) {
  //       return res.status(400).json({
  //         errors: ['paciente nao existe'],
  //       });
  //     }

  //     return res.json(patient);
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((err) => err.mensage),
  //     });
  //   }
  // }

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
