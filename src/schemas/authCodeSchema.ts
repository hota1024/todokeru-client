import * as yup from 'yup'

export const authCodeSchema = yup.object({
  code: yup.string().required('入力してください。'),
})

export type AuthCodeSchema = yup.InferType<typeof authCodeSchema>
