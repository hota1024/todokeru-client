import * as yup from 'yup'

export const groupSchema = yup.object({
  name: yup.string().required('入力してください。'),
})

export type GroupSchema = yup.InferType<typeof groupSchema>
