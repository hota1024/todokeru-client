import * as yup from 'yup'

export const tempAdminEmailSchema = yup.object({
  address: yup
    .string()
    .email('正しいメールアドレスを入力してください。')
    .required('入力してください。'),
})

export type TempAdminEmailSchema = yup.InferType<typeof tempAdminEmailSchema>
