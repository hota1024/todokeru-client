import { MailForm } from '@/components/mails/MailForm'
import { useCreateMailMutation, useGroupsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { MailSchema } from '@/schemas/mailSchema'
import { LinearProgress } from '@mui/material'
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

  const onSubmit: SubmitHandler<MailSchema> = async (data) => {
    setLoading(true)

    try {
      await createMail({
        variables: {
          data,
        },
      })
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
