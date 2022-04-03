import { useCurrentUser } from '@/atoms/auth'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import { UserRole } from '@/graphql/generated'
import { useRequiredAuth } from '@/hooks/useRequriedAuth'
import { Container } from '@mui/material'

/**
 * UserLayout props.
 */
export type UserLayoutProps = {
  /**
   * children.
   */
  children: React.ReactNode
}

/**
 * UserLayout component.
 */
export const UserLayout: React.VFC<UserLayoutProps> = (props) => {
  const { children } = props
  const [{ currentUser }] = useCurrentUser()
  const checking = useRequiredAuth(UserRole.Normal)

  if (checking || !currentUser) {
    return <FullscreenLoading type="authenticating" />
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      {children}
    </Container>
  )
}
