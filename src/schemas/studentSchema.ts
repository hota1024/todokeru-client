import * as yup from 'yup'

export const studentSchema = yup.object({
  name: yup.string().required('入力してください。'),
  surname: yup.string().required('入力してください。'),
  groupId: yup.string().required('入力してください。'),
})

export type StudentSchema = yup.InferType<typeof studentSchema>
