import { authCodeSchema, AuthCodeSchema } from '@/schemas/authCodeSchema'
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
 * RegisterCodeForm props.
 */
export type RegisterCodeFormProps = {
  loading: boolean
  onSubmit: SubmitHandler<AuthCodeSchema>
  onUndo: () => void
  errorMessage?: string | null
}

/**
 * RegisterCodeForm component.
 */
export const RegisterCodeForm: React.VFC<RegisterCodeFormProps> = (props) => {
  const { loading, onSubmit, onUndo, errorMessage } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCodeSchema>({
    resolver: yupResolver(authCodeSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Typography paragraph>
          メールアドレス宛に認証コードを送信しました。下のフィールドに認証コードを入力し、「次へ」をクリックしてください。
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <TextField
          label="認証コード"
          error={!!errors.code}
          helperText={errors.code}
          fullWidth
          disabled={loading}
          {...register('code')}
        />
      </CardContent>
      <Divider></Divider>
      <CardActions>
        <LoadingButton onClick={onUndo} loading={loading}>
          戻る
        </LoadingButton>
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
