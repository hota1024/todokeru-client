import { useCurrentUser } from '@/atoms/auth'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import { UserRole } from '@/graphql/generated'
import { useRequiredAuth } from '@/hooks/useRequriedAuth'
import { Box, Toolbar } from '@mui/material'
import { useState } from 'react'
import { AdminDrawer } from './AdminDrawer'
import { AdminMain } from './AdminMain'
import { AdminToolbar } from './AdminToolbar'

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
  const [drawerOpen, setDrawerOpen] = useState(true)

  if (checking || !currentUser) {
    return <FullscreenLoading type="authenticating" />
  }

  return (
    <Box display="flex">
      <AdminToolbar toggleDrawer={() => setDrawerOpen((v) => !v)} />
      <AdminDrawer open={drawerOpen} />
      <AdminMain open={drawerOpen}>
        <Toolbar />
        {children}
      </AdminMain>
    </Box>
  )
}
