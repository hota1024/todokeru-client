import { useLogout } from '@/atoms/auth'
import { Logout, Menu } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'

/**
 * AdminToolbar props.
 */
export type AdminToolbarProps = {
  toggleDrawer: () => void
}

/**
 * AdminToolbar component.
 */
export const AdminToolbar: React.VFC<AdminToolbarProps> = (props) => {
  const { toggleDrawer } = props
  const logout = useLogout()
  const router = useRouter()

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
          onClick={() => toggleDrawer()}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6">Todokeru</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          startIcon={<Logout />}
          onClick={() => logout(() => location.reload())}
        >
          ログアウト
        </Button>
      </Toolbar>
    </AppBar>
  )
}
