import { FullscreenLoading } from '@/components/FullscreenLoading'
import { MailAccountForm } from '@/components/mail-accounts/MailAccountForm'
import {
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
  const [fetchAccount, { data: accountData, refetch }] =
    useMailAccountLazyQuery()
  const router = useRouter()

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
      console.log(error)
      if (error instanceof Error) {
        setError(error)
      }
    }
    setLoading(false)
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
        />
      ) : (
        <Skeleton height={400} />
      )}
    </AdminLayout>
  )
}
