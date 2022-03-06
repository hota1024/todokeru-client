import { AuthCodeSchema, authCodeSchema } from '@/schemas/authCodeSchema'
import {
  tempAdminEmailSchema,
  TempAdminEmailSchema,
} from '@/schemas/tempAdminEmailSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  Alert,
} from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

/**
 * AdminUserSetupForm props.
 */
export type AdminUserSetupFormProps = {
  loading?: boolean
  tempUserId?: string | null
  createTempUser?(): void
  createTempEmail?(data: { address: string; userId: string }): void
  backToEmail?(): void
  checkCode?(code: string): void
  wasSentOtc?: boolean
  emailConfirmed: boolean
  error?: string | null
  onComplete(): void
}

/**
 * AdminUserSetupForm component.
 */
export const AdminUserSetupForm: React.VFC<AdminUserSetupFormProps> = (
  props
) => {
  const {
    error,
    loading,
    tempUserId,
    createTempUser,
    createTempEmail,
    backToEmail,
    checkCode,
    wasSentOtc,
    emailConfirmed,
    onComplete,
  } = props
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErros },
  } = useForm<TempAdminEmailSchema>({
    resolver: yupResolver(tempAdminEmailSchema),
    defaultValues: {
      address: '',
    },
  })
  const {
    register: registerAuthCode,
    handleSubmit: handleSubmitAuthCode,
    formState: { errors: authCodeErrors },
  } = useForm<AuthCodeSchema>({
    resolver: yupResolver(authCodeSchema),
    defaultValues: {
      code: '',
    },
  })

  let content
  let button
  let title

  if (emailConfirmed) {
    title = '管理者ユーザーの登録が完了しました'

    content =
      '管理者ユーザーの登録が完了しました。「完了」を押すと管理画面に移動します。'

    button = (
      <>
        <Box flexGrow={1} />
        <Button
          component="a"
          variant="contained"
          disableElevation
          disabled={loading}
          onClick={onComplete}
        >
          完了
        </Button>
      </>
    )
  } else if (typeof tempUserId === 'undefined') {
    content = (
      <Typography paragraph>
        これから管理者ユーザーのセットアップをはじめます。
      </Typography>
    )
    button = (
      <>
        <Box flexGrow={1} />
        <Button
          variant="contained"
          disableElevation
          onClick={createTempUser}
          disabled={loading}
        >
          次へ
        </Button>
      </>
    )
  } else if (wasSentOtc) {
    title = '認証コードの確認'

    content = (
      <Stack spacing={2}>
        <TextField
          key="auth-code"
          label="認証コード"
          error={!!authCodeErrors.code}
          helperText={authCodeErrors.code?.message}
          disabled={loading}
          {...registerAuthCode('code')}
        />
      </Stack>
    )

    button = (
      <>
        <Button disabled={loading} onClick={() => backToEmail && backToEmail()}>
          メールアドレスを入力し直す
        </Button>
        <Box flexGrow={1} />
        <Button
          variant="contained"
          disableElevation
          disabled={loading}
          onClick={handleSubmitAuthCode(
            (data) => checkCode && checkCode(data.code)
          )}
        >
          認証
        </Button>
      </>
    )
  } else {
    title = '管理者ユーザーのメールアドレスの登録'

    content = (
      <Stack spacing={2}>
        <TextField
          key="email"
          label="メールアドレス"
          error={!!emailErros.address}
          helperText={emailErros.address?.message}
          disabled={loading}
          {...registerEmail('address')}
        />
      </Stack>
    )

    button = (
      <>
        <Box flexGrow={1} />
        <Button
          variant="contained"
          disableElevation
          onClick={handleSubmitEmail(
            (data) =>
              createTempEmail &&
              createTempEmail({ ...data, userId: tempUserId! })
          )}
          disabled={loading}
        >
          認証コードを送信
        </Button>
      </>
    )
  }

  return (
    <>
      <Card variant="outlined">
        {loading && <LinearProgress />}
        <CardHeader title="管理者ユーザーのセットアップ" subheader={title} />
        <Divider />
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {content}
        </CardContent>
        <Divider />
        <CardActions>{button}</CardActions>
      </Card>
    </>
  )
}
