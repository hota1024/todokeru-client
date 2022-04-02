import { MailAccountForm } from '@/components/mail-accounts/MailAccountForm'
import {
  useCreateFirstPrimaryMailAccountMutation,
  useCreateMailAccountMutation,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { MailAccountSchema } from '@/schemas/mailAccountSchema'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { AdminHeader } from '../AdminHeader'

/**
 * MailAccountNew props.
 */
export type MailAccountNewProps = {}

/**
 * MailAccountNew component.
 */
export const MailAccountNew: React.VFC<MailAccountNewProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [createMailAccount] = useCreateMailAccountMutation()
  const router = useRouter()

  const onSubmit: SubmitHandler<MailAccountSchema> = async (data) => {
    setError(null)
    try {
      setLoading(true)
      const { data: created } = await createMailAccount({
        variables: { data },
      })
      await router.push(
        `/admin/settings/mail-accounts/${created?.createMailAccount.id}`
      )
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      }
    }
    setLoading(false)
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="メールアカウントの追加"
        previousText="メールアカウント設定へ"
        previousHref="/admin/settings/mail-accounts"
      />
      <MailAccountForm
        errorMessage={error?.message}
        loading={loading}
        onSubmit={onSubmit}
      />
    </AdminLayout>
  )
}
