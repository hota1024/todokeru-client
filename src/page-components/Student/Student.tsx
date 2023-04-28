import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { AdminHeader } from '../AdminHeader'
import { useRouter } from 'next/router'
import {
  useDeleteStudentMutation,
  useGroupsLazyQuery,
  useStudentLazyQuery,
  useUpdateStudentMutation,
} from '@/graphql/generated'
import { useEffect, useState } from 'react'
import { StudentForm } from '@/components/students/StudentForm'
import { LinearProgress } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useConfirm } from '@/atoms/confirm'
import { SubmitHandler } from 'react-hook-form'
import { StudentSchema } from '@/schemas/studentSchema'

/**
 * Student props.
 */
export type StudentProps = {}

/**
 * Student component.
 */
export const Student: React.VFC<StudentProps> = (props) => {
  const router = useRouter()
  const [fetchStudent, { data: studentData }] = useStudentLazyQuery({
    fetchPolicy: 'no-cache',
  })
  const [fetchGroups, { data: groupData }] = useGroupsLazyQuery({
    fetchPolicy: 'no-cache',
  })

  const student = studentData?.student ?? null
  const groups = groupData?.groups ?? null

  const defaults = studentData?.student
    ? {
        ...studentData.student,
        groupId: studentData.student.group.id,
      }
    : {}

  const [updateStudent] = useUpdateStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()

  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const confirm = useConfirm()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      fetchStudent({
        variables: {
          id: router.query.id,
        },
      })
    }
  }, [fetchStudent, router.query.id])

  const onSubmit: SubmitHandler<StudentSchema> = async (data) => {
    setLoading(true)
    setError(null)

    try {
      await updateStudent({
        variables: {
          id: router.query.id as string,
          data: {
            surname: data.surname,
            name: data.name,
            groupId: data.groupId,
          },
        },
      })
      enqueueSnackbar('更新しました', { variant: 'success' })
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }

    setLoading(false)
  }

  const onDelete = async () => {
    confirm({
      title: 'お子さんの情報を削除しますか？',
      description: `${studentData?.student?.surname} ${studentData?.student?.name} を本当に削除しますか？`,
      confirmText: '削除する',
      confirmColor: 'error',
      async onConfirm() {
        const id = router.query.id as string
        setLoading(true)

        try {
          await deleteStudent({
            variables: {
              id,
            },
          })
          enqueueSnackbar('削除しました', { variant: 'success' })
          await router.push('/admin/users')
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message)
          }
        }

        setLoading(false)
      },
    })
  }

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      fetchStudent({
        variables: {
          id: router.query.id,
        },
      })
      fetchGroups()
    }
  }, [fetchGroups, fetchStudent, router.query.id])

  return (
    <AdminLayout>
      <AdminHeader
        title={student ? `${student.surname}${student.name} さん` : '園児詳細'}
        previousHref="/admin/users"
        previousText="園児等"
      />
      {student && groups ? (
        <StudentForm
          loading={loading}
          groups={groups}
          defaults={defaults}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
