import { FullscreenLoading } from '@/components/FullscreenLoading'
import { MailView } from '@/components/mails/MailView'
import {
  ReadTransportMutation,
  useOrgNameQuery,
  useReadTransportMutation,
} from '@/graphql/generated'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * TransportRead page.
 */
export const TransportReadPage: NextPage = () => {
  const [read] = useReadTransportMutation()
  const { data: orgNameData } = useOrgNameQuery({
    fetchPolicy: 'no-cache',
  })
  const [transport, setTransport] =
    useState<ReadTransportMutation['readTransport']>()
  const router = useRouter()
  const orgName = orgNameData?.orgName

  useEffect(() => {
    const id = router.query.id

    if (typeof id !== 'string') {
      return
    }

    read({ variables: { id } }).then((data) => {
      setTransport(data.data?.readTransport)
    })
  }, [read, router.query.id])

  return (
    <>
      {transport ? (
        <MailView mail={transport.mail} orgName={orgName} />
      ) : (
        <FullscreenLoading />
      )}
    </>
  )
}

export default TransportReadPage
