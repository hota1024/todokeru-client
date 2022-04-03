import { Dashboard, Groups, Mail, People, Settings } from '@mui/icons-material'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import Link from 'next/link'

/**
 * AdminDrawer props.
 */
export type AdminDrawerProps = {
  open: boolean
}

export const drawerWidth = 300

/**
 * AdminDrawer component.
 */
export const AdminDrawer: React.VFC<AdminDrawerProps> = (props) => {
  const { open } = props
  const menuItems = [
    {
      icon: <Dashboard />,
      text: 'ダッシュボード',
      href: '/admin',
    },
    {
      icon: <Groups />,
      text: 'クラス',
      href: '/admin/groups',
    },
    {
      icon: <People />,
      text: '生徒',
      href: '/admin/students',
    },
    {
      icon: <Mail />,
      text: 'メール',
      href: '/admin/mails',
    },
    {
      icon: <Settings />,
      text: '設定',
      href: '/admin/settings',
    },
  ]

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      variant="persistent"
      open={open}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <Link href={item.href} passHref key={item.href}>
              <ListItem component="a" button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
