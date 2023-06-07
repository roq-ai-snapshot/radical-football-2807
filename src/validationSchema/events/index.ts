import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  location: yup.string(),
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  academy_id: yup.string().nullable().required(),
});
