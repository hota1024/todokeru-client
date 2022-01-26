import * as yup from 'yup'

export const setupFormSchema = yup.object({
  organizationName: yup.string().required('入力してください'),
  adminEmail: yup
    .string()
    .email('正しいメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
})

export type SetupFormData = yup.InferType<typeof setupFormSchema>
