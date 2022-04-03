import { useJWT } from '@/atoms/auth'
import {
  useCheckTempUserAliveMutation,
  useCreateTempEmailMutation,
  useCreateTempUserMutation,
  useValidateEmailAuthCodeMutation,
} from '@/graphql/generated'
import { AuthCodeSchema } from '@/schemas/authCodeSchema'
import { LoginEmailSchema } from '@/schemas/loginEmailSchema'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  LinearProgress,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RegisterCodeForm } from './RegisterCodeForm'
import { RegisterEmailForm } from './RegisterEmailForm'

const TEMP_USER_KEY = 'TODOKERU_REGISTERD_TEMP_USER_ID'

/**
 * RegisterContent props.
 */
export type RegisterContentProps = {
  onRegistered(): void
}

/**
 * RegisterContent component.
 */
export const RegisterContent: React.VFC<RegisterContentProps> = (props) => {
  const { onRegistered } = props

  // mutations
  const [checkTemp] = useCheckTempUserAliveMutation()
  const [createTemp] = useCreateTempUserMutation()
  const [createEmail] = useCreateTempEmailMutation()
  const [validateCode] = useValidateEmailAuthCodeMutation()

  // states
  const [page, setPage] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loadingTemp, setLoadingTemp] = useState(false)
  const [tempUserId, setTempUserId] = useState<string>()
  const [codeId, setCodeId] = useState<string>()
  const [loading, setLoading] = useState(false)

  // jotai
  const [, setJWT] = useJWT()

  // effects
  useEffect(() => {
    const create = async () => {
      const { data: user } = await createTemp()
      if (user) {
        localStorage.setItem(TEMP_USER_KEY, user.createTempUser.id)
        setTempUserId(user.createTempUser.id)
      }
    }

    ;(async () => {
      setError(null)
      setLoadingTemp(true)

      const id = localStorage.getItem(TEMP_USER_KEY)
      if (id) {
        const { data } = await checkTemp({ variables: { id } })

        if (data?.checkTempUserAlive) {
          setTempUserId(id)
        } else {
          await create()
        }
      } else {
        await create()
      }

      setLoadingTemp(false)
    })()
  }, [checkTemp, createTemp])

  let title
  let content
  let form
  let previousButton
  let nextButton

  if (loadingTemp) {
    title = '登録'
    content = (
      <>
        <LinearProgress />
        <Typography paragraph>前回の登録情報を取得しています...</Typography>
      </>
    )
  }
  if (page === 0) {
    title = '登録'
    content = (
      <>
        <Typography paragraph>
          今からメール配信システムへの登録を始めます。登録は保護者の代表の方が行うようにしてください。
        </Typography>
        <Link href="/login" passHref>
          <a>
            以前にも登録されたことがある方はこちらからログインしてください。
          </a>
        </Link>
      </>
    )

    previousButton = null
    nextButton = <LoadingButton onClick={() => setPage(1)}>次へ</LoadingButton>
  } else if (page === 1) {
    const onSubmit: SubmitHandler<LoginEmailSchema> = async (data) => {
      if (!tempUserId) {
        return
      }
      setLoading(true)
      setError(null)

      try {
        const { data: email } = await createEmail({
          variables: {
            data: {
              address: data.email,
              userId: tempUserId,
            },
          },
        })

        setCodeId(email?.createTempEmail.codeId)
        setPage(2)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }

      setLoading(false)
    }

    title = '代表者のメールアドレス登録'
    form = (
      <RegisterEmailForm
        onSubmit={onSubmit}
        errorMessage={error}
        loading={loading}
      />
    )
  } else if (page === 2) {
    const onSubmit: SubmitHandler<AuthCodeSchema> = async (data) => {
      if (!codeId) {
        return
      }
      setLoading(true)

      try {
        const { data: result } = await validateCode({
          variables: {
            data: {
              codeId,
              code: data.code,
            },
          },
        })

        if (result?.validateEmailAuthCode) {
          onRegistered()
          setJWT(result.validateEmailAuthCode.jwt)
          localStorage.removeItem(TEMP_USER_KEY)
          setPage(3)
        } else {
          setError('認証コードが間違っています。再度お試しください。')
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }

      setLoading(false)
    }

    title = '認証コードの確認'
    form = (
      <RegisterCodeForm
        onUndo={() => setPage(1)}
        onSubmit={onSubmit}
        errorMessage={error}
        loading={loading}
      />
    )
  } else if (page === 3) {
    title = '登録が完了しました'
    content =
      '登録が完了しました。ユーザーメニューに移動し、受け取るメールの設定を行ってください。'
    nextButton = (
      <Link href="/" passHref>
        <Button
          component="a"
          variant="contained"
          disableElevation
          color="success"
        >
          ユーザーメニューへ
        </Button>
      </Link>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Card variant="outlined">
        <CardHeader title={title} />
        <Divider />
        {form ? (
          form
        ) : (
          <>
            <CardContent>
              {error && <Alert severity="error">{error}</Alert>}
              {content}
            </CardContent>
            <Divider />
            <CardActions>
              {previousButton}
              <Box flexGrow={1} />
              {nextButton}
            </CardActions>
          </>
        )}
      </Card>
    </Container>
  )
}
