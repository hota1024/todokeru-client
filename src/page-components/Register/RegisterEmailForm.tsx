import { loginEmailSchema, LoginEmailSchema } from '@/schemas/loginEmailSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

/**
 * RegisterEmailForm props.
 */
export type RegisterEmailFormProps = {
  onSubmit: SubmitHandler<LoginEmailSchema>
  loading: boolean
  errorMessage?: string | null
}

/**
 * RegisterEmailForm component.
 */
export const RegisterEmailForm: React.VFC<RegisterEmailFormProps> = (props) => {
  const { onSubmit, loading, errorMessage } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginEmailSchema>({
    resolver: yupResolver(loginEmailSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Typography paragraph>
          最初に保護者の代表の方のメールアドレスを入力してください。このメールアドレスはログインの際に使われます。他の保護者様のメールアドレスは後ほど追加することが出来ます。
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
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
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          loading={loading}
        >
          次へ
        </LoadingButton>
      </CardActions>
    </form>
  )
}
