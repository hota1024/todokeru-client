import { MailAccount } from '@/graphql/generated'
import {
  MailAccountEditSchema,
  mailAccountEditSchema,
  mailAccountSchema,
  MailAccountSchema,
} from '@/schemas/mailAccountSchema'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  LinearProgress,
  Stack,
  TextField,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

/**
 * MailAccountForm props.
 */
export type MailAccountFormProps = {
  defaults?: Partial<MailAccount>
  loading?: boolean
  errorMessage?: string
  onSubmit: SubmitHandler<MailAccountSchema>
  onDelete?: () => void
}

/**
 * MailAccountForm component.
 */
export const MailAccountForm: React.VFC<MailAccountFormProps> = (props) => {
  const { defaults, onSubmit, loading, errorMessage, onDelete } = props

  const isNew = !defaults?.id
  const isFirstPrimary = isNew && !!defaults?.isPrimary

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<MailAccountSchema | MailAccountEditSchema>({
    resolver: yupResolver(isNew ? mailAccountSchema : mailAccountEditSchema),
    defaultValues: {
      ...defaults,
    },
  })

  return (
    <>
      <Card variant="outlined">
        {loading && <LinearProgress />}
        <CardHeader
          title={
            isNew
              ? isFirstPrimary
                ? 'メインメールアカウントの追加'
                : 'メールアカウントの追加'
              : 'メールアカウントの編集'
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <TextField
              label="ホスト"
              error={!!errors.host}
              helperText={errors.host?.message}
              disabled={loading}
              {...register('host')}
            />
            <TextField
              label="ポート"
              error={!!errors.port}
              helperText={errors.port?.message}
              disabled={loading}
              {...register('port')}
            />
            <Controller
              control={control}
              defaultValue={false}
              name="secure"
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                      disabled={loading}
                    />
                  }
                  label="セキュア通信"
                />
              )}
            />
            <TextField
              label="ユーザー名"
              type="email"
              error={!!errors.user}
              helperText={errors.user?.message}
              disabled={loading}
              {...register('user')}
            />
            <TextField
              label="パスワード"
              type="password"
              error={!!errors.password}
              helperText={
                errors.password?.message ??
                (isNew ? '' : '編集するとパスワードが変更されます')
              }
              disabled={loading}
              {...register('password')}
            />
            <Controller
              control={control}
              defaultValue={false}
              name="isPrimary"
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={`メインアカウントにする${
                    isFirstPrimary ? '(セットアップのため変更できません)' : ''
                  }`}
                  disabled={isFirstPrimary || loading}
                />
              )}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ display: 'flex' }}>
          <Box flex={1} />
          {!isNew && onDelete && (
            <Button color="error" onClick={onDelete}>
              削除
            </Button>
          )}
          <Button
            variant="contained"
            disableElevation
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {isNew ? '作成' : '更新'}
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
