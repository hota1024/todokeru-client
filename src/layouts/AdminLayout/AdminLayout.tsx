import { useCurrentUser } from '@/atoms/auth'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import { UserRole } from '@/graphql/generated'
import { useRequiredAuth } from '@/hooks/useRequriedAuth'

/**
 * AdminLayout props.
 */
export type AdminLayoutProps = {
  /**
   * children.
   */
  children: React.ReactNode
}

/**
 * AdminLayout component.
 */
export const AdminLayout: React.VFC<AdminLayoutProps> = (props) => {
  const { children } = props
  const [{ currentUser }] = useCurrentUser()
  const checking = useRequiredAuth(UserRole.Admin)

  if (checking || !currentUser) {
    return <FullscreenLoading type="authenticating" />
  }

  return <>{children}</>
}
