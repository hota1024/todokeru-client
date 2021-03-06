import { useMailWithTransportsLazyQuery } from '@/graphql/generated'
import { useInterval } from '@/hooks/useInterval'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Alert, Button, Grid, LinearProgress } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { AdminHeader } from '../AdminHeader'
import { ProgressCard } from './ProgressCard'
import { ReadDatesCard } from './ReadDatesCard'
import { TransportCard } from './TransportCard'

/**
 * MailStatus props.
 */
export type MailStatusProps = {}

/**
 * MailStatus component.
 */
export const MailStatus: React.VFC<MailStatusProps> = (props) => {
  const [fetchMail, { data: mailData }] = useMailWithTransportsLazyQuery()
  const mail = mailData?.mail ?? null

  const router = useRouter()

  const loadMail = useCallback(async () => {
    if (typeof router.query.id === 'string') {
      fetchMail({ variables: { id: router.query.id } })
    }
  }, [fetchMail, router.query.id])

  useEffect(() => {
    loadMail()
  }, [loadMail])

  useInterval(() => {
    loadMail()
  }, 1000)

  return (
    <AdminLayout>
      <AdminHeader
        title={mail ? `「${mail.subject}」の配信状況` : 'メールの配信状況'}
        previousHref={`/admin/mails/${mail?.id}`}
        previousText={`「${mail?.subject}」へ`}
      />
      {mail ? (
        mail.wasSent ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ProgressCard transports={mail.transports} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ReadDatesCard transports={mail.transports} />
              </Grid>
            </Grid>
            <Box my={4} />
            <Grid container spacing={2}>
              {mail.transports.map((transport) => (
                <Grid item xs={12} sm={6} md={4} key={transport.id}>
                  <TransportCard transport={transport} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Alert
            severity="info"
            action={
              <Link href={`/admin/mails/${mail.id}/send`} passHref>
                <Button
                  component="a"
                  variant="contained"
                  disableElevation
                  color="secondary"
                >
                  配信準備をする
                </Button>
              </Link>
            }
          >
            このメールは配信されていません。
          </Alert>
        )
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
