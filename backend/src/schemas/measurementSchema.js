import * as Yup from 'yup';

const schema = {
  store: {
    body: Yup.object().shape({
      insulin: Yup.number(),
      carbs: Yup.number(),
      glucose: Yup.number(),
    }),
    params: Yup.object().shape({
      patient_id: Yup.number().required(),
    }),
  },
  update: {
    body: Yup.object().shape({
      insulin: Yup.number(),
      carbs: Yup.number(),
      glucose: Yup.number(),
    }),
    params: Yup.object().shape({
      id: Yup.number().required(),
      patient_id: Yup.number().required(),
    }),
  },
  show: {
    params: Yup.object().shape({
      id: Yup.number().required(),
      patient_id: Yup.number(),
    }),
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required(),
      patient_id: Yup.number().required(),
    }),
  },
};

export default schema;
