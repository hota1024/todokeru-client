import { useCurrentUser, useLogout } from '@/atoms/auth'
import { UserRole } from '@/graphql/generated'
import { UserLayout } from '@/layouts/UserLayout/UserLayout'
import { getSubdomain } from '@/utils/urls'
import { Dashboard, Logout, Settings } from '@mui/icons-material'
import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [{ currentUser }] = useCurrentUser()
  const logout = useLogout()
  const router = useRouter()

  const menuItems = [
    // {
    //   icon: <Mail />,
    //   text: '受信トレイ',
    //   description: '受け取ったメールを見ることが出来ます。',
    //   href: '/inbox',
    // },
    {
      icon: <Settings />,
      text: '受け取り設定',
      description: 'メールアドレスの設定やクラスの設定をすることが出来ます。',
      href: '/settings',
    },
    {
      icon: <Logout />,
      text: 'ログアウト',
      description: 'ログアウトはこちら。',
      href: '#',
      onClick: () => logout(() => location.reload()),
    },
  ]

  return (
    <UserLayout>
      <Card>
        <List subheader={<ListSubheader>ユーザーメニュー</ListSubheader>}>
          {menuItems.map((item) => (
            <Link href={item.href} passHref key={item.href}>
              <ListItem component="a" button onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  secondary={item.description}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        {currentUser?.role === UserRole.Admin && (
          <List subheader={<ListSubheader>管理者</ListSubheader>}>
            <Link href="/admin" passHref>
              <ListItem component="a" button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText
                  primary="ダッシュボード"
                  secondary="管理者用ページはこちらから。"
                />
              </ListItem>
            </Link>
          </List>
        )}
      </Card>
    </UserLayout>
  )
}

export default HomePage
