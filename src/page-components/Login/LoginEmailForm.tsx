import { LoginEmailSchema, loginEmailSchema } from '@/schemas/loginEmailSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Send } from '@mui/icons-material'
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
 * LoginEmailForm props.
 */
export type LoginEmailFormProps = {
  onSubmit: (data: LoginEmailSchema) => void
  error?: string
  loading?: boolean
}

/**
 * LoginEmailForm component.
 */
export const LoginEmailForm: React.VFC<LoginEmailFormProps> = (props) => {
  const { onSubmit, loading, error } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginEmailSchema>({
    resolver: yupResolver(loginEmailSchema),
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
          ユーザーのメールアドレスを入力してください。
        </Typography>
        <TextField
          label="メールアドレス"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={loading}
          {...register('email')}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Box flexGrow={1} />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          startIcon={<Send />}
          disabled={loading}
        >
          {loading ? '処理中です...' : '認証コードを送信'}
        </Button>
      </CardActions>
    </Card>
  )
}
