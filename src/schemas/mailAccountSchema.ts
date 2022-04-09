import * as yup from 'yup'

export const mailAccountSchema = yup.object({
  host: yup.string().required('入力してください。'),
  port: yup
    .string()
    .matches(/^\d{1,6}$/, 'ポートは半角数字6桁以内で入力してください。')
    .required('入力してください。'),
  secure: yup.boolean().required('入力してください。'),
  isPrimary: yup.boolean().required('入力してください。'),
  user: yup.string().required('入力してください。'),
  password: yup.string().required('入力してください。'),
  sendRate: yup.number().required('入力してください。'),
})

export type MailAccountSchema = yup.InferType<typeof mailAccountSchema>

export const mailAccountEditSchema = yup.object({
  host: yup.string().required('入力してください。'),
  port: yup
    .string()
    .matches(/^\d{1,6}$/, 'ポートは半角数字6桁以内で入力してください。')
    .required('入力してください。'),
  secure: yup.boolean().required('入力してください。'),
  isPrimary: yup.boolean().required('入力してください。'),
  user: yup.string().required('入力してください。'),
  sendRate: yup
    .number()
    .min(0.1, '最小値は0.1秒です。')
    .required('入力してください。'),
})

export type MailAccountEditSchema = yup.InferType<typeof mailAccountSchema>
