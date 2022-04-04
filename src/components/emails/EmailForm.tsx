import { RegisterCodeForm } from '@/page-components/Register/RegisterCodeForm'
import { authCodeSchema, AuthCodeSchema } from '@/schemas/authCodeSchema'
import { loginEmailSchema, LoginEmailSchema } from '@/schemas/loginEmailSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

/**
 * EmailForm props.
 */
export type EmailFormProps = {
  page: number
  loading: boolean
  errorMessage?: string | null
  undoTo(page: number): void
  enterEmail(email: string): void
  enterCode(code: string): void
}

/**
 * EmailForm component.
 */
export const EmailForm: React.VFC<EmailFormProps> = (props) => {
  const { loading, page, errorMessage, undoTo, enterEmail, enterCode } = props
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<LoginEmailSchema>({
    resolver: yupResolver(loginEmailSchema),
  })
  const {
    register: registerCode,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors },
  } = useForm<AuthCodeSchema>({
    resolver: yupResolver(authCodeSchema),
  })

  let title
  let content

  if (page === 0) {
    title = '追加するメールアドレス'
    content = (
      <form onSubmit={handleEmailSubmit(({ email }) => enterEmail(email))}>
        <CardContent>
          <Typography paragraph>
            追加するメールアドレスを入力してください。ここで入力したメールアドレスはメールの受取とユーザーメニューへのログインで使うことが出来ます。
          </Typography>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            label="メールアドレス"
            error={!!emailErrors.email}
            helperText={emailErrors.email?.message}
            fullWidth
            disabled={loading}
            {...registerEmail('email')}
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
  } else if (page === 1) {
    title = '認証コードの確認'
    content = (
      <RegisterCodeForm
        loading={loading}
        onSubmit={({ code }) => enterCode(code)}
        onUndo={() => undoTo(0)}
        errorMessage={errorMessage}
      />
    )
  }

  return (
    <Card variant="outlined">
      <CardHeader title={title} />
      <Divider />
      {content}
    </Card>
  )
}
