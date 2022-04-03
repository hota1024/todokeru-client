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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GroupSchema>({
    resolver: yupResolver(groupSchema),
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
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
        setError(error)
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
      <Card
        component="form"
        variant="outlined"
        sx={{ maxWidth: 400 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent>
          <TextField
            label="クラス名"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={loading}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Box flexGrow={1} />
          <LoadingButton
            type="submit"
            variant="contained"
            disableElevation
            loading={loading}
          >
            追加
          </LoadingButton>
        </CardActions>
      </Card>
    </AdminLayout>
  )
}
