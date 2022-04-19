import { GroupForm } from '@/components/groups/GroupForm'
import { useCreateGroupMutation } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { groupSchema, GroupSchema } from '@/schemas/groupSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AdminHeader } from '../AdminHeader'

/**
 * GroupNew props.
 */
export type GroupNewProps = {}

/**
 * GroupNew component.
 */
export const GroupNew: React.VFC<GroupNewProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createGroup] = useCreateGroupMutation()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit: SubmitHandler<GroupSchema> = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const { data: created } = await createGroup({
        variables: { data },
      })
      enqueueSnackbar(
        `「${created?.createGroup.name}」クラスを追加しました。`,
        {
          variant: 'success',
        }
      )
      await router.push(`/admin/groups/${created?.createGroup.id}`)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }

    setLoading(false)
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="クラスの追加"
        previousText="クラスの管理へ"
        previousHref="/admin/groups"
      />
      <GroupForm onSubmit={onSubmit} errorMessage={error} loading={loading} />
    </AdminLayout>
  )
}
