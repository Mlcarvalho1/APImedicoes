import * as Yup from 'yup';

const schema = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8).max(50),
      password_confirmation: Yup.string().required(),
    }),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().min(3).max(255),
      email: Yup.string().email(),
      password: Yup.string().min(8).max(50),
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
