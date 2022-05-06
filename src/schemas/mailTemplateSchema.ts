import * as yup from 'yup'

export const mailTemplateSchema = yup.object({
  subject: yup.string().required('入力してください。'),
  body: yup.string().required('入力してください。'),
})

export type MailTemplateSchema = yup.InferType<typeof mailTemplateSchema>
