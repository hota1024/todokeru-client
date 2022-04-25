import { useConfirm } from '@/atoms/confirm'
import { Group, GroupsQuery, Mail } from '@/graphql/generated'
import { MailSchema, mailSchema } from '@/schemas/mailSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'

/**
 * MailForm props.
 */
export type MailFormProps = {
  defaults?: Partial<{
    id: string
    subject: string
    body: string
    groupIds: string[]
  }>
  wasSent?: boolean
  groups: GroupsQuery['groups']
  onSubmit: SubmitHandler<MailSchema>
  loading?: boolean
  errorMessage?: string | null
  onDelete?(): void
}

/**
 * MailForm component.
 */
export const MailForm: React.VFC<MailFormProps> = (props) => {
  const {
    defaults,
    groups,
    onSubmit,
    loading,
    errorMessage,
    onDelete,
    wasSent,
  } = props
  const isNew = !defaults?.id

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<MailSchema>({
    defaultValues: defaults,
    resolver: yupResolver(mailSchema),
  })

  return (
    <Card variant="outlined" component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader title={isNew ? 'メールの作成' : defaults.subject} />
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            label="件名"
            variant="filled"
            error={!!errors.subject}
            helperText={errors.subject?.message}
            disabled={loading}
            {...register('subject')}
          />
          <Autocomplete
            options={groups}
            getOptionLabel={(g) => `${g.name}(${g.students.length}人)`}
            multiple
            onChange={(_, v) =>
              setValue('groupIds', v ? v.map((g) => g!.id) : [])
            }
            defaultValue={defaults?.groupIds?.map(
              (g) => groups.find(({ id }) => id === g)!
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="配信先"
                variant="filled"
                error={!!errors.groupIds}
                helperText={
                  errors?.groupIds
                    ? (errors.groupIds as unknown as FieldError).message
                    : ''
                }
                disabled={loading}
              />
            )}
          />
          <TextField
            label="本文"
            variant="filled"
            multiline
            rows={10}
            error={!!errors.subject}
            helperText={errors.subject?.message}
            disabled={loading}
            {...register('body')}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        {onDelete && (
          <LoadingButton
            color="error"
            variant="contained"
            disableElevation
            loading={loading}
            disabled={wasSent}
            onClick={onDelete}
          >
            削除
          </LoadingButton>
        )}
        <Box flexGrow={1} />
        {!wasSent && (
          <Link href={`/admin/mails/${defaults?.id}/send`} passHref>
            <LoadingButton
              component="a"
              variant="contained"
              disableElevation
              color="secondary"
              loading={loading}
            >
              配信を準備する
            </LoadingButton>
          </Link>
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          loading={loading}
        >
          保存する
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
