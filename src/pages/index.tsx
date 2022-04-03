import { useCurrentUser, useLogout } from '@/atoms/auth'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import { UserRole } from '@/graphql/generated'
import { useRequiredAuth } from '@/hooks/useRequriedAuth'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Dashboard, Logout, Mail, Settings } from '@mui/icons-material'
import {
  Card,
  CardHeader,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const checking = useRequiredAuth(UserRole.Normal)
  const [{ currentUser }] = useCurrentUser()
  const logout = useLogout()
  const router = useRouter()

  const menuItems = [
    {
      icon: <Mail />,
      text: '受信トレイ',
      description: '受け取ったメールを見ることが出来ます。',
      href: '/inbox',
    },
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
      onClick: () => logout(() => router.push('login')),
    },
  ]

  if (checking) {
    return <FullscreenLoading type="authenticating" />
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
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
    </Container>
  )
}

export default HomePage
