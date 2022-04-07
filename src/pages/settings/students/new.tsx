import { StudentForm } from '@/components/students/StudentForm'
import { useCreateStudentMutation, useGroupsQuery } from '@/graphql/generated'
import { UserLayout } from '@/layouts/UserLayout/UserLayout'
import { AdminHeader } from '@/page-components/AdminHeader'
import { StudentSchema } from '@/schemas/studentSchema'
import { Alert, LinearProgress } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

/**
 * StudentNew page.
 */
export const StudentNewPage: NextPage = () => {
  // queries
  const { data: groupsData } = useGroupsQuery()
  const groups = groupsData?.groups ?? []
  const group = groups[0] ?? undefined

  // mutations
  const [createStudent] = useCreateStudentMutation()

  // states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>()

  // logic states
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const surname =
    typeof router.query.surname === 'string' ? router.query.surname : undefined

  const onSubmit: SubmitHandler<StudentSchema> = async (data) => {
    setLoading(true)
    setError(null)

    try {
      await createStudent({
        variables: {
          data,
        },
      })
      enqueueSnackbar('登録しました', { variant: 'success' })
      await router.push('/settings')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }

    setLoading(false)
  }

  return (
    <UserLayout>
      <AdminHeader
        title="お子さんの登録"
        previousText="受け取り設定へ"
        previousHref="/settings"
      />
      {groupsData ? (
        groups.length === 0 ? (
          <Alert severity="error">
            このシステムにはお子さんが所属する組が登録されていません。管理者が操作を完了するまでしばらくお待ち下さい。
          </Alert>
        ) : (
          <StudentForm
            groups={groups}
            loading={loading}
            errorMessage={error}
            defaults={{ surname, groupId: group.id }}
            onSubmit={onSubmit}
          />
        )
      ) : (
        <LinearProgress />
      )}
    </UserLayout>
  )
}

export default StudentNewPage
