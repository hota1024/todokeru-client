import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { PersonAdd, Storage } from '@mui/icons-material'
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import { AdminHeader } from '../AdminHeader'

/**
 * Settings props.
 */
export type SettingsProps = {}

/**
 * Settings component.
 */
export const Settings: React.VFC<SettingsProps> = (props) => {
  const menuItems = [
    {
      icon: <PersonAdd />,
      text: '受付設定',
      description: '受付を開始したり終了したりすることが出来ます。',
      href: '/admin/settings/registeration',
    },
    {
      icon: <Storage />,
      text: 'メールアカウント設定',
      description:
        'メールサーバーの設定やアカウントの管理をすることが出来ます。',
      href: '/admin/settings/mail-accounts',
    },
  ]

  return (
    <AdminLayout>
      <AdminHeader title="設定" />
      <Card variant="outlined">
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <Link href={item.href} passHref key={item.href}>
              <ListItem component="a" button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  secondary={item.description}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Card>
    </AdminLayout>
  )
}
