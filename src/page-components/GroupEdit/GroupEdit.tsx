import { useConfirm } from '@/atoms/confirm'
import { GroupForm } from '@/components/groups/GroupForm'
import {
  useDeleteGroupMutation,
  useGroupLazyQuery,
  useUpdateGroupMutation,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { GroupSchema } from '@/schemas/groupSchema'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  TextField,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { AdminHeader } from '../AdminHeader'

/**
 * GroupEdit props.
 */
export type GroupEdit = {}

/**
 * GroupEdit component.
 */
export const GroupEdit: React.VFC<GroupEdit> = (props) => {
  const [fetchGroup, { data: groupData, refetch }] = useGroupLazyQuery()
  const [updateGroup, { loading: updating }] = useUpdateGroupMutation()
  const [deleteGroup, { loading: deleting }] = useDeleteGroupMutation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const confirm = useConfirm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      fetchGroup({
        variables: {
          id: router.query.id,
        },
      })
    }
  }, [fetchGroup, router.query.id])

  const onSubmit: SubmitHandler<GroupSchema> = async (data) => {
    if (!groupData) {
      return
    }

    setError(undefined)
    setLoading(true)

    try {
      await updateGroup({
        variables: {
          id: groupData.group.id,
          data: {
            name: data.name,
            isPrivate: data.isPrivate,
          },
        },
      })
      await refetch()
      enqueueSnackbar('更新しました。', { variant: 'success' })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }

    setLoading(false)
  }

  const onDelete = () => {
    if (!groupData) {
      return
    }

    confirm({
      title: 'クラスを削除しますか？',
      description: `本当に「${groupData.group.name}」を削除しますか？`,
      confirmText: '削除する',
      confirmColor: 'error',
      async onConfirm() {
        try {
          await deleteGroup({
            variables: {
              id: groupData.group.id,
            },
          })
          await router.push('/admin/groups')
          enqueueSnackbar('削除しました。', { variant: 'success' })
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(`エラーが発生しました: ${error.message}`, {
              variant: 'error',
            })
          }
        }
      },
    })
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="クラスの編集"
        previousText="クラスの管理へ"
        previousHref="/admin/groups"
      />

      {groupData ? (
        <GroupForm
          defaults={groupData.group}
          loading={loading || updating || deleting}
          errorMessage={error}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
