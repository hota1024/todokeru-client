import { useMailsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Mail } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { AdminHeader } from '../AdminHeader'

/**
 * Mails props.
 */
export type MailsProps = {}

/**
 * Mails component.
 */
export const Mails: React.VFC<MailsProps> = (props) => {
  const { data: mailsData, loading: mailsLoading } = useMailsQuery({
    fetchPolicy: 'no-cache',
  })

  const mails = mailsData?.mails ?? []

  return (
    <AdminLayout>
      <AdminHeader title="メール" />
      <Card variant="outlined">
        <CardHeader
          title="メール一覧"
          subheader={
            <Link href="/admin/mails/new" passHref>
              <Button component="a">メールを作成</Button>
            </Link>
          }
        />
        <Divider />
        <List>
          {mailsLoading && (
            <ListItem>
              <ListItemText primary={<Skeleton variant="text" />} />
            </ListItem>
          )}
          {mails.map((mail, i) => (
            <div key={mail.id}>
              <Link href={`/admin/mails/${mail.id}`} passHref>
                <ListItem component="a" button alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <Mail />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="h6" display="inline">
                          {mail.subject}
                        </Typography>
                      </>
                    }
                    secondary={
                      <>
                        <Box pt={1}>
                          To:{' '}
                          {mail.groups.map((g) => (
                            <Chip key={g.id} label={g.name} sx={{ mr: 1 }} />
                          ))}
                        </Box>
                        <Box pt={1}>
                          状態:{' '}
                          <Chip label={mail.wasSent ? '送信済み' : '未送信'} />
                        </Box>
                        <Typography sx={{ py: 1 }}>
                          {mail.body.slice(0, 100) +
                            `${mail.body.length > 100 ? '...' : ''}`}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Link>
              {i !== mails.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Card>
    </AdminLayout>
  )
}
