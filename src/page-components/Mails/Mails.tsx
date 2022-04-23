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
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { group } from 'console'
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
                <ListItem component="a" button>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                      <Chip label={mail.wasSent ? '送信済み' : '未送信'} />
                    </Grid>
                    <Grid item xs={5}>
                      <Typography>{mail.subject}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      To:{' '}
                      {mail.groups.map((group) => (
                        <Box mr={1} display="inline" key={group.id}>
                          <Chip label={group.name} />
                        </Box>
                      ))}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>
                        {mail.body.slice(0, 20)}
                        {mail.body.length > 20 && '...'}
                      </Typography>
                    </Grid>
                  </Grid>
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
