import Patient from '../models/Patient';

import Profifepic from '../models/ProfilePics';

export default {
  storeFoto: async (file, patient_id, user_id) => {
    const patient = await Patient.findOne({
      where: {
        id: patient_id,
        user_id,
      },

    });

    if (!patient) {
      return { errors: ['este paciente nao existe'] };
    }

    const { filename, originalname, path } = file;

    const profilepic = await Profifepic.create({
      filename, originalname, path, patient_id,
    });

    return profilepic;
  },

};
