import Measurement from '../models/Measurement';
import Patient from '../models/Patient';

export default {
  store: async (data, patient_id, user_id) => Measurement.create(data, {
    where: {
      patient_id,
    },
    include: {
      model: Patient,
      where: {
        user_id,
      },
      attributes: [],
    },
  }),

  show: async (id, patient_id, user_id) => {
    const measurement = await Measurement.findOne({
      where: {
        id,
        patient_id,
      },
      include: {
        model: Patient,
        where: {
          user_id,
        },
        attributes: [],
      },
      attributes: ['glucose', 'carbs', 'insulin'],
    });

    if (!measurement) {
      return { errors: ['esta medicao nao existe'] };
    }

    return measurement;
  },

  index: async (patient_id, user_id) => {
    const measurements = await Measurement.findAll({
      where: {
        patient_id,
      },
      include: {
        model: Patient,
        where: {
          user_id,
        },
        attributes: [],
      },
      attributes: ['glucose', 'carbs', 'insulin'],
    });

    if (!measurements.length) {
      return { errors: 'nenhuma medicao registrada nesse paciente' };
    }

    return measurements;
  },

  delete: async (id, patient_id, user_id) => {
    const measurement = await Measurement.scope({
      method: ['ofLoggedUser', user_id],
    }).findOne({
      where: {
        id,
        patient_id,
      },
    });

    if (!measurement) {
      return { errors: ['esta medicao nao existe'] };
    }

    return measurement.destroy();
  },

  update: async (data, id, patient_id, user_id) => {
    const measurement = Measurement.update(data, {
      where: {
        id,
        patient_id,
      },
      include: {
        model: Patient,
        where: {
          user_id,
        },
        attributes: [],
      },
    });
    if (!measurement) {
      return { errors: ['medicao nao existe'] };
    }
    return measurement;
  },

};
