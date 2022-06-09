import Patient from '../models/Patient';
import Measurement from '../models/Measurement';
import ProfilePics from '../models/ProfilePics';

export default {
  store: async (data) => {
    const totalPatients = await Patient.count({
      where: {
        name: data.name,
        borned_at: data.borned_at,
      },
    });

    if (totalPatients) {
      throw new Error('Paciente ja cadastrado');
    }

    const {
      name, id, borned_at, height, weight,
    } = await Patient.create(data);

    return {
      name, id, borned_at, height, weight,
    };
  },
  show: async (id, userId) => {
    const patient = await Patient.findOne({
      where: {
        id,
        user_id: userId,
      },
      attributes: ['id', 'name', 'borned_at', 'weight', 'height'],
      order: [['id', 'DESC'], [ProfilePics, 'id', 'DESC']],
      include: [{
        model: ProfilePics,
        attributes: ['filename'],
      },
      {
        model: Measurement,
        attributes: ['glucose'],
      }],
    });
    if (!patient) {
      throw new Error('Paciente nao existe');
    }

    // const plusMedia = pessoas.map((obj, index) => {
    //   const newObj = { ...obj }; newObj.id = (index + 1000); return newObj;
    // });

    console.log(patient.measurements);

    return patient;
  },
  index: async (user_id) => {
    const patients = Patient.findAll({
      where: {
        user_id,
      },
      attributes: ['id', 'name', 'borned_at', 'weight', 'height'],
      order: [['id', 'DESC'], [ProfilePics, 'id', 'DESC']],
      include: {
        model: ProfilePics,
        attributes: ['filename'],
      },
    });
    return patients;
  },
  delete: async (id, user_id) => {
    const patient = await Patient.findOne({
      where: {
        id,
        user_id,
      },
    });

    if (!patient) {
      throw new Error('Paciente nao existe');
    }

    return patient.destroy();
  },
  update: async (data, id, user_id) => {
    const patient = await Patient.update(data, {
      where: { id, user_id },
    }, {
      returning: true,
    });

    if (!patient) {
      throw new Error('Paciente nao encontrado');
    }
    return patient;
  },
};
