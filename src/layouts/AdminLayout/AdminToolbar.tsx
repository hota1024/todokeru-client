import { useLogout } from '@/atoms/auth'
import { Add, Logout, Menu } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
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
        <Box sx={{ margin: 2 }} />
        <Link href="/admin/mails/new" passHref>
          <Button
            component="a"
            variant="contained"
            disableElevation
            style={{ background: 'rgba(0, 0, 0, 0.1)' }}
            startIcon={<Add />}
          >
            メールを作成
          </Button>
        </Link>
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
