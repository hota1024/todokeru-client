import { useCurrentUser } from '@/atoms/auth'
import { FullscreenLoading } from '@/components/FullscreenLoading'
import { UserRole } from '@/graphql/generated'
import { useRequiredAuth } from '@/hooks/useRequriedAuth'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Dashboard, Mail, Settings } from '@mui/icons-material'
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

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const checking = useRequiredAuth(UserRole.Normal)
  const [{ currentUser }] = useCurrentUser()

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
      description: '受け取り設定やクラス設定をすることが出来ます。',
      href: '/mail-settings',
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
        {currentUser?.role === UserRole.Admin && (
          <List subheader={<ListSubheader>管理者</ListSubheader>}>
            <Link href="/admin" passHref>
              <ListItem component="a" button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText>ダッシュボード</ListItemText>
              </ListItem>
            </Link>
          </List>
        )}
      </Card>
    </Container>
  )
}

export default HomePage
