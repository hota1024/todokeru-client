import * as yup from 'yup'

export const orgNameSchema = yup.object({
  orgName: yup.string().required('入力してください。'),
})

export type OrgNameSchema = yup.InferType<typeof orgNameSchema>
