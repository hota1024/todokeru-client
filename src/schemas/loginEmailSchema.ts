import * as yup from 'yup'

export const loginEmailSchema = yup.object({
  email: yup
    .string()
    .email('正しいメールアドレスを入力してください。')
    .required('入力してください。'),
})

export type LoginEmailSchema = yup.InferType<typeof loginEmailSchema>
