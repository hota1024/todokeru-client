import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

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
      </Toolbar>
    </AppBar>
  )
}
