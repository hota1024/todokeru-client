import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Groups, Mail, PersonAdd, Storage } from '@mui/icons-material'
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
      icon: <Groups />,
      text: '組織設定',
      description: '組織の名称や情報を設定します。',
      href: '/admin/settings/org',
    },
    {
      icon: <Mail />,
      text: 'メール設定',
      description: 'メールの件名や本文に関する設定します。',
      href: '/admin/settings/mail',
    },
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
          {menuItems.map((item, index) => (
            <Link href={item.href} passHref key={item.href}>
              <ListItem
                component="a"
                button
                sx={{
                  borderBottom:
                    index === menuItems.length - 1
                      ? void 0
                      : '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
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
