import { MailForm } from '@/components/mails/MailForm'
import { useCreateMailMutation, useGroupsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { MailSchema } from '@/schemas/mailSchema'
import { LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { AdminHeader } from '../AdminHeader'

/**
 * MailNew props.
 */
export type MailNewProps = {}

/**
 * MailNew component.
 */
export const MailNew: React.VFC<MailNewProps> = (props) => {
  const { data: groupsData, loading: groupsLoading } = useGroupsQuery()
  const [createMail] = useCreateMailMutation()

  const groups = groupsData?.groups ?? []

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit: SubmitHandler<MailSchema> = async (data) => {
    setLoading(true)

    try {
      const { data: createMailData } = await createMail({
        variables: {
          data,
        },
      })
      await router.push(`/admin/mails/${createMailData?.createMail.id}`)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }

    setLoading(false)
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="メールの作成"
        previousHref="/mails"
        previousText="メール一覧へ"
      />
      {groupsLoading ? (
        <LinearProgress />
      ) : (
        <MailForm
          groups={groups}
          onSubmit={onSubmit}
          loading={loading}
          errorMessage={error}
        />
      )}
    </AdminLayout>
  )
}
