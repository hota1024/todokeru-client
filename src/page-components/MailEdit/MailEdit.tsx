import { useConfirm } from '@/atoms/confirm'
import { MailForm } from '@/components/mails/MailForm'
import {
  useDeleteMailMutation,
  useGroupsQuery,
  useMailLazyQuery,
  useMailQuery,
  useUpdateMailMutation,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { MailSchema } from '@/schemas/mailSchema'
import { LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { AdminHeader } from '../AdminHeader'

/**
 * MailEdit props.
 */
export type MailEditProps = {}

/**
 * MailEdit component.
 */
export const MailEdit: React.VFC<MailEditProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: groupsData, loading: groupsLoading } = useGroupsQuery({
    fetchPolicy: 'no-cache',
  })
  const [fetchMail, { data: mailData, loading: mailLoading }] =
    useMailLazyQuery()
  const [updateMail] = useUpdateMailMutation()
  const [deleteMail] = useDeleteMailMutation()
  const { enqueueSnackbar } = useSnackbar()
  const confirm = useConfirm()

  const router = useRouter()
  const mail = mailData ? mailData.mail : null
  const groups = groupsData?.groups ?? []
  const defaults = {
    ...mail,
    groupIds: mail?.groups.map((group) => group.id),
  }

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      fetchMail({
        variables: {
          id: router.query.id,
        },
      })
    }
  }, [fetchMail, router.query])

  const onSubmit: SubmitHandler<MailSchema> = async (data) => {
    if (typeof router.query.id !== 'string') {
      return
    }

    setLoading(true)
    setError(null)

    try {
      await updateMail({
        variables: {
          id: router.query.id,
          data: {
            subject: data.subject,
            groupIds: data.groupIds,
            body: data.body,
          },
        },
      })
      enqueueSnackbar('保存しました。', { variant: 'success' })
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }

    setLoading(false)
  }

  const onDelete = async () => {
    confirm({
      title: 'メールを削除しますか？',
      description: `本当に「${mail?.subject}」を削除しますか？`,
      confirmText: '削除する',
      confirmColor: 'error',
      async onConfirm() {
        if (typeof router.query.id !== 'string') {
          return
        }

        setLoading(true)

        try {
          await deleteMail({
            variables: {
              id: router.query.id,
            },
          })

          enqueueSnackbar('削除しました。', { variant: 'success' })
          await router.push('/admin/mails')
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message)
          }
        }

        setError(null)
        setLoading(false)
      },
    })
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="メール"
        previousHref="/admin/mails"
        previousText="メール一覧へ"
      />
      {mail && groups.length ? (
        <MailForm
          defaults={defaults}
          groups={groups}
          errorMessage={error}
          onSubmit={onSubmit}
          onDelete={onDelete}
          loading={loading}
        />
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
