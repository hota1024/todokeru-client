import { useMailWithTransportsLazyQuery } from '@/graphql/generated'
import { useInterval } from '@/hooks/useInterval'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Alert, Grid, LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { AdminHeader } from '../AdminHeader'
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
      />
      {mail ? (
        mail.wasSent ? (
          <Grid container>
            {mail.transports.map((transport) => (
              <Grid item xs={12} sm={6} md={4} key={transport.id}>
                <TransportCard transport={transport} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info">このメールは配信されていません。</Alert>
        )
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
