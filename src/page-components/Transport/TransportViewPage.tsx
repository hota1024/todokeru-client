import { useTransportLazyQuery } from '@/graphql/generated'
import { useInterval } from '@/hooks/useInterval'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Grid, LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { AdminHeader } from '../AdminHeader'
import { TransportCard } from '../MailStatus/TransportCard'
import { TransportRejectCard } from './TransportRejectCard'

/**
 * TransportViewPage props.
 */
export type TransportViewPageProps = {}

/**
 * TransportViewPage component.
 */
export const TransportViewPage: React.VFC<TransportViewPageProps> = (props) => {
  const [fetchTransport, { data: transportData }] = useTransportLazyQuery()
  const transport = transportData?.transport ?? null
  const router = useRouter()

  const load = useCallback(() => {
    if (typeof router.query.id === 'string') {
      fetchTransport({
        variables: {
          id: router.query.id,
        },
      })
    }
  }, [fetchTransport, router.query.id])

  useEffect(() => {
    load()
  }, [load])

  useInterval(() => {
    load()
  }, 1000)

  return (
    <AdminLayout>
      <AdminHeader
        title="配信の詳細"
        previousText={`「${transport?.mail.subject}」の配信状況へ`}
        previousHref={`/admin/mails/${transport?.mail.id}/status`}
      />
      {transport ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TransportCard transport={transport} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TransportRejectCard transport={transport} />
          </Grid>
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
