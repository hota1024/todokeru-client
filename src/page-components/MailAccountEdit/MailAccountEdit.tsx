import { useConfirm } from '@/atoms/confirm'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import { MailAccountForm } from '@/components/mail-accounts/MailAccountForm'
import {
  useDeleteMailAccountMutation,
  useMailAccountLazyQuery,
  useUpdateMailAccountMutation,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { MailAccountSchema } from '@/schemas/mailAccountSchema'
import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { AdminHeader } from '../AdminHeader'

/**
 * MailAccountEdit props.
 */
export type MailAccountEditProps = {}

/**
 * MailAccountEdit component.
 */
export const MailAccountEdit: React.VFC<MailAccountEditProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [updateAccount] = useUpdateMailAccountMutation()
  const [deleteAccount] = useDeleteMailAccountMutation()
  const [fetchAccount, { data: accountData, refetch }] =
    useMailAccountLazyQuery()
  const router = useRouter()
  const confirm = useConfirm()

  useEffect(() => {
    if (router.query.id) {
      fetchAccount({ variables: { id: router.query.id.toString() } })
    }
  }, [fetchAccount, router.query])

  const onSubmit: SubmitHandler<MailAccountSchema> = async (data) => {
    const updateBody = {
      host: data.host,
      port: data.port,
      secure: data.secure,
      user: data.user,
      password: data.password,
      isPrimary: data.isPrimary,
    }
    setError(null)
    setLoading(true)
    try {
      await updateAccount({
        variables: { id: accountData?.mailAccount.id!, data: updateBody },
      })
      await refetch()
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      }
    }
    setLoading(false)
  }

  const onDelete = async () => {
    confirm({
      title: '本当に削除しますか？',
      description: 'このアカウントを削除しますか？',
      confirmText: '削除する',
      confirmColor: 'error',
      async onConfirm() {
        setError(null)
        setLoading(true)
        try {
          await deleteAccount({
            variables: {
              id: accountData?.mailAccount.id!,
            },
          })
          await router.push('/admin/settings/mail-accounts')
        } catch (error) {
          if (error instanceof Error) {
            setError(error)
          }
        }
        setLoading(false)
      },
    })
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="メールアカウントの編集"
        previousText="メールアカウント設定へ"
        previousHref="/admin/settings/mail-accounts"
      />
      {accountData ? (
        <MailAccountForm
          onSubmit={onSubmit}
          defaults={accountData.mailAccount}
          loading={loading}
          errorMessage={error?.message}
          onDelete={onDelete}
        />
      ) : (
        <Skeleton height={400} />
      )}
    </AdminLayout>
  )
}
