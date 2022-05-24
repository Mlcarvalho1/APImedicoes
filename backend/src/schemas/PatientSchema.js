import * as Yup from 'yup';

const schema = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      borned_at: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    }),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().min(3).max(255),
      borned_at: Yup.date(),
      weight: Yup.number(),
      height: Yup.number(),
    }),
    params: Yup.object().shape({
      id: Yup.number(),
    }),
  },
  show: {
    params: Yup.object().shape({
      id: Yup.number().min(1).nullable(),
    }),
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }),
  },
};

export default schema;
