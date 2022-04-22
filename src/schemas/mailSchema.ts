import * as yup from 'yup'

export const mailSchema = yup.object({
  subject: yup.string().required('入力してください。'),
  body: yup.string().required('入力してください。'),
  groupIds: yup
    .array()
    .of(yup.string().required('入力してください。'))
    .required('入力してください。')
    .min(1, '最低1つは送信先を指定してください。'),
})

export type MailSchema = yup.InferType<typeof mailSchema>
