import { Group, GroupsQuery, Mail } from '@/graphql/generated'
import { MailSchema, mailSchema } from '@/schemas/mailSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
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
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'

/**
 * MailForm props.
 */
export type MailFormProps = {
  defaults?: Partial<Mail>
  groups: GroupsQuery['groups']
  onSubmit: SubmitHandler<MailSchema>
  loading?: boolean
  errorMessage?: string | null
}

/**
 * MailForm component.
 */
export const MailForm: React.VFC<MailFormProps> = (props) => {
  const { defaults, groups, onSubmit, loading, errorMessage } = props
  const isNew = !defaults?.id

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<MailSchema>({
    defaultValues: {
      subject: defaults?.subject,
      body: defaults?.body,
      groupIds: defaults?.groups?.map((g) => g.id) ?? [],
    },
    resolver: yupResolver(mailSchema),
  })

  return (
    <Card variant="outlined" component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader title={isNew ? 'メールの作成' : defaults.subject} />
      <Divider />
      <CardContent>
        <Stack spacing={2}>
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
            getOptionLabel={(g) => `${g.name}(${g.students.length}人が所属中)`}
            multiple
            onChange={(_, v) =>
              setValue('groupIds', v ? v.map((g) => g.id) : [])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="送信先"
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
        <Box flexGrow={1} />
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          loading={loading}
        >
          保存する(送信はされません)
        </LoadingButton>
      </CardActions>
    </Card>
  )
}