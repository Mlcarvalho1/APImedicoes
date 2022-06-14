import { Op } from 'sequelize';
import Measurement from '../models/Measurement';
import Patient from '../models/Patient';

export default {
  store: async (data, patient_id, user_id) => {
    data.measurement_day = data.measurement_date.toISOString().slice(0, 10);
    Measurement.create(data, {
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
    });
  },

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
      attributes: ['glucose', 'carbs', 'insulin', 'measurement_date', 'id'],
    });

    if (!measurement) {
      throw new Error('esta medicao nao existe');
    }

    return measurement;
  },

  index: async (options) => {
    const whereCondition = {
      patient_id: options.patient_id,
      measurement_day: options.day,
    };
    const promises = [
      Measurement.findAll({
        order: [['measurement_date', 'ASC']],
        where: whereCondition,
        logging: console.log,
        include: {
          model: Patient,
          where: {
            user_id: options.user_id,
          },
          attributes: [],
        },
        limit: 6,
        offset: (options.page - 1) * 6,
        attributes: ['glucose', 'carbs', 'insulin', 'measurement_date', 'id'],
      }),
    ];

    if (options.page === 1) {
      promises.push(
        Measurement.scope({
          method: ['ofLoggedUser', options.user_id],
        }).count({
          where: whereCondition,
        }),
      );
    }

    const [items, totalItems] = await Promise.all(promises);
    const responseData = {
      items,
    };

    if (options.page === 1) {
      responseData.total_items = totalItems;
    }

    return responseData;
  },
  listChart: async (options) => {
    const whereCondition = {
      patient_id: options.patient_id,
      measurement_day: {
        [Op.between]: [options.startDay, options.endDay],
      },
    };

    if (options.startDay && !options.endDay) {
      whereCondition.measurement_day = {
        [Op.gte]: options.startDay,
      };
    }

    if (!options.startDay && options.endDay) {
      whereCondition.measurement_day = {
        [Op.lte]: options.endDay,
      };
    }

    return Measurement.findAll({
      order: [['measurement_date', 'ASC']],
      where: whereCondition,
      include: {
        model: Patient,
        where: {
          user_id: options.user_id,
        },
        attributes: [],
      },
      attributes: ['glucose', 'carbs', 'insulin', 'measurement_date', 'id'],
    });

    // return measurements.map((measurement) => ({
    //   measurement_date: measurement_date.setHours(measurement.measurement_date.getHours() - 3)
    // }));
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
      throw new Error('esta medicao nao existe');
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
      throw new Error('esta medicao nao existe');
    }
    return measurement;
  },

};
