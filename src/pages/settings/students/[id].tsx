import { useConfirm } from '@/atoms/confirm'
import { StudentForm } from '@/components/students/StudentForm'
import {
  useDeleteStudentMutation,
  useGroupsQuery,
  useStudentLazyQuery,
  useUpdateStudentMutation,
} from '@/graphql/generated'
import { UserLayout } from '@/layouts/UserLayout/UserLayout'
import { AdminHeader } from '@/page-components/AdminHeader'
import { StudentSchema } from '@/schemas/studentSchema'
import { LinearProgress } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

/**
 * StudentEdit page.
 */
export const StudentEditPage: NextPage = () => {
  // queries
  const { data: groupsData } = useGroupsQuery({
    fetchPolicy: 'no-cache',
  })
  const groups = groupsData?.groups || []
  const [fetchStudent, { data: studentData }] = useStudentLazyQuery({
    fetchPolicy: 'no-cache',
  })
  const defaults = studentData?.student
    ? {
        ...studentData.student,
        groupId: studentData.student.group.id,
      }
    : {}

  // mutations
  const [updateStudent] = useUpdateStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()

  // logic states
  const router = useRouter()
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
          await router.push('/settings')
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message)
          }
        }

        setLoading(false)
      },
    })
  }

  return (
    <UserLayout>
      <AdminHeader
        title="お子さんの情報の編集"
        previousText="受け取り設定へ"
        previousHref="/settings"
      />
      {studentData && groupsData ? (
        <StudentForm
          onSubmit={onSubmit}
          onDelete={onDelete}
          loading={loading}
          defaults={defaults}
          groups={groups}
        />
      ) : (
        <LinearProgress />
      )}
    </UserLayout>
  )
}

export default StudentEditPage
