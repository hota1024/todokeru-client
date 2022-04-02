import { useCurrentUser } from '@/atoms/auth'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import { Alert, Button, Container } from '@mui/material'
import Link from 'next/link'

/**
 * Register props.
 */
export type RegisterProps = {}

/**
 * Register component.
 */
export const Register: React.VFC<RegisterProps> = (props) => {
  const [{ currentUser, isValidating }] = useCurrentUser()

  if (isValidating) {
    return <FullscreenLoading />
  }

  if (currentUser) {
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
          既にログインしています。
        </Alert>
      </Container>
    )
  }

  return (
    <>
      <h1>test</h1>
    </>
  )
}
