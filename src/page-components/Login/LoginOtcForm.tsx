import { authCodeSchema, AuthCodeSchema } from '@/schemas/authCodeSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Login } from '@mui/icons-material'
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  CardActions,
  Box,
  Button,
  LinearProgress,
  Alert,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'

/**
 * LoginOtcForm props.
 */
export type LoginOtcFormProps = {
  onSubmit: (data: AuthCodeSchema) => void
  resetEmail(): void
  email: string
  error?: string
  loading?: boolean
}

/**
 * LoginOtcForm component.
 */
export const LoginOtcForm: React.VFC<LoginOtcFormProps> = (props) => {
  const { onSubmit, loading, resetEmail, error, email } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCodeSchema>({
    resolver: yupResolver(authCodeSchema),
  })

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)}>
      {loading && <LinearProgress />}
      <CardHeader title="ログイン" />
      <Divider />
      <CardContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography sx={{ mb: 2 }}>
          {email}{' '}
          宛に送信した認証コードを送信しました。下のフォームに認証コードを入力しログインしてください。
        </Typography>
        <TextField
          label="認証コード"
          fullWidth
          error={!!errors.code}
          helperText={errors.code?.message}
          disabled={loading}
          {...register('code')}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          type="submit"
          disableElevation
          disabled={loading}
          onClick={resetEmail}
        >
          メールアドレスを入力し直す
        </Button>
        <Box flexGrow={1} />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          startIcon={<Login />}
          disabled={loading}
        >
          ログイン
        </Button>
      </CardActions>
    </Card>
  )
}
