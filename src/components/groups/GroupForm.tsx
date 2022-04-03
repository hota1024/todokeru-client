import { Group, useCreateGroupMutation } from '@/graphql/generated'
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

/**
 * GroupForm props.
 */
export type GroupFormProps = {
  defaults?: Partial<{ id: string; name: string }>
  onSubmit: SubmitHandler<GroupSchema>
  onDelete?(): void
  loading: boolean
  errorMessage?: string
}

/**
 * GroupForm component.
 */
export const GroupForm: React.VFC<GroupFormProps> = (props) => {
  const { defaults, onSubmit, onDelete, loading, errorMessage } = props
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GroupSchema>({
    resolver: yupResolver(groupSchema),
    defaultValues: defaults,
  })

  const isNew = !defaults?.id

  return (
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
        {!isNew && onDelete && (
          <LoadingButton color="error" loading={loading} onClick={onDelete}>
            削除
          </LoadingButton>
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          loading={loading}
        >
          {isNew ? '追加' : '更新'}
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
