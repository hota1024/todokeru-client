import { MailAccountForm } from '@/components/mail-accounts/MailAccountForm'
import { useMailAccountsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Add, Storage } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Skeleton,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { AdminHeader } from '../AdminHeader'

/**
 * MailAccounts props.
 */
export type MailAccountsProps = {}

/**
 * MailAccounts component.
 */
export const MailAccounts: React.VFC<MailAccountsProps> = (props) => {
  const { data: accountsData, loading } = useMailAccountsQuery()

  const accounts = accountsData?.mailAccounts ?? []

  return (
    <AdminLayout>
      <AdminHeader
        title="メールアカウント設定"
        previousText="設定へ"
        previousHref="/admin/settings"
      />
      <Card variant="outlined">
        <List subheader={<ListSubheader>メールアカウント一覧</ListSubheader>}>
          {loading && <Skeleton variant="rectangular" height={64} />}
          {accounts.map((account) => (
            <Link
              href={`/admin/settings/mail-accounts/${account.id}`}
              passHref
              key={account.id}
            >
              <ListItem component="a" button>
                <ListItemIcon>
                  <Storage />
                </ListItemIcon>
                <ListItemText
                  primary={`${account.user}@${account.host}`}
                  secondary={account.isPrimary ? 'メインアカウント' : null}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <CardActions>
          <Box flexGrow={1} />
          <Link href="/admin/settings/mail-accounts/new" passHref>
            <Button component="a">メールアカウントを追加</Button>
          </Link>
        </CardActions>
      </Card>
    </AdminLayout>
  )
}
