import { useCurrentUser } from '@/atoms/auth'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import {
  useIsRegisterationReceptableQuery,
  useValidateRegisterationTokenMutation,
} from '@/graphql/generated'
import { Alert, Button, Container } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RegisterContent } from './RegisterContent'

/**
 * Register props.
 */
export type RegisterProps = {}

/**
 * Register component.
 */
export const Register: React.VFC<RegisterProps> = (props) => {
  const [{ currentUser, isValidating }] = useCurrentUser()
  const router = useRouter()
  const { data: receptable, loading: loadingReceptable } =
    useIsRegisterationReceptableQuery()
  const [validatingToken, setValidatingToken] = useState(false)
  const [validateSuccess, setValidateSuccess] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [validateToken] = useValidateRegisterationTokenMutation()

  useEffect(() => {
    if (typeof router.query.token === 'string') {
      setValidatingToken(true)
      validateToken({
        variables: {
          token: router.query.token,
        },
      }).then((data) => {
        setValidateSuccess(data.data?.validateRegisterationToken ?? false)
        setValidatingToken(false)
      })
    }
  }, [router.query.token, validateToken])

  if (isValidating || loadingReceptable || validatingToken) {
    return <FullscreenLoading />
  }

  if (currentUser && !registered) {
    return (
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Alert
          severity="warning"
          action={
            <Link href="/" passHref>
              <Button>ユーザーメニューへ</Button>
            </Link>
          }
        >
          既にログインしています。情報の更新は「ユーザーメニュー」で行うことが出来ます。
        </Alert>
      </Container>
    )
  }

  if (receptable?.isRegisterationReceptable === false) {
    return (
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Alert
          severity="warning"
          action={
            <Link href="/login" passHref>
              <Button>ログイン画面へ</Button>
            </Link>
          }
        >
          現在、登録を受け付けていません。
        </Alert>
      </Container>
    )
  }

  if (!validateSuccess) {
    return (
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Alert
          severity="error"
          action={
            <Link href="/login" passHref>
              <Button>ログイン画面へ</Button>
            </Link>
          }
        >
          登録に必要な資格情報を確認することが出来ませんでした。
        </Alert>
      </Container>
    )
  }

  return (
    <>
      <RegisterContent onRegistered={() => setRegistered(true)} />
    </>
  )
}
