import { useCurrentUser, useJWT, useLogout } from '@/atoms/auth'
import { CheckJWT } from '@/components/CheckJWT'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import {
  useCreateOtcMutation,
  useValidateEmailAuthCodeMutation,
} from '@/graphql/generated'
import { AuthCodeSchema } from '@/schemas/authCodeSchema'
import { LoginEmailSchema } from '@/schemas/loginEmailSchema'
import {
  Container,
  Box,
  Card,
  CardHeader,
  Divider,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LoginEmailForm } from './LoginEmailForm'
import { LoginOtcForm } from './LoginOtcForm'

/**
 * Login component.
 */
export const Login: React.VFC = () => {
  const [, setJWT] = useJWT()
  const [createOtc, { loading: creating, error: createError }] =
    useCreateOtcMutation()
  const [validateOtc, { loading: validating, error: validateError }] =
    useValidateEmailAuthCodeMutation()
  const [codeId, setCodeId] = useState<string>()
  const [email, setEmail] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [{ currentUser, isValidating }] = useCurrentUser()
  const router = useRouter()
  const logout = useLogout()

  const handleEmailSubmit = async ({ email }: LoginEmailSchema) => {
    setEmail(email)
    try {
      const { data } = await createOtc({
        variables: {
          data: {
            address: email,
          },
        },
      })

      if (data) {
        setCodeId(data.createOtc.codeId)
      }
    } catch {}
  }

  const handleOtcSubmit = async ({ code }: AuthCodeSchema) => {
    if (!codeId) {
      return
    }

    try {
      const { data } = await validateOtc({
        variables: {
          data: {
            codeId,
            code,
          },
        },
      })

      if (data) {
        setJWT(data.validateEmailAuthCode.jwt)
        setSuccess(true)

        const to = typeof router.query.to === 'string' ? router.query.to : '/'
        router.push(to)
      }
    } catch {}
  }

  if (isValidating || success) {
    return <FullscreenLoading type="authenticating" />
  }

  return (
    <Container maxWidth="sm">
      <CheckJWT />
      <Box my={4}>
        {currentUser ? (
          <Card>
            <CardHeader title="既にログインしています。" />
            <Divider />
            <CardContent>
              既にログインしています。トップページに戻るか、ログアウトしてください。
            </CardContent>
            <Divider />
            <CardActions>
              <Link href="/" passHref>
                <Button component="a">トップページに戻る</Button>
              </Link>
              <Box flexGrow={1} />
              <Button onClick={() => logout(() => router.reload())}>
                ログアウト
              </Button>
            </CardActions>
          </Card>
        ) : codeId === undefined ? (
          <LoginEmailForm
            onSubmit={handleEmailSubmit}
            error={createError?.message}
            loading={creating || creating}
          />
        ) : (
          <LoginOtcForm
            resetEmail={() => setCodeId(undefined)}
            onSubmit={handleOtcSubmit}
            email={email}
            error={validateError?.message}
            loading={validating || creating}
          />
        )}
      </Box>
    </Container>
  )
}
