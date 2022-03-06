import {
  useHasAdminQuery,
  useHasPrimaryMailAccountQuery,
} from '@/graphql/generated'
import { AdminUserSetup } from '@/page-components/Setup/AdminUserSetup'
import { MailAccountSetup } from '@/page-components/Setup/MailAccountSetup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * SetupContainer props.
 */
export type SetupContainerProps = {
  children?: React.ReactNode
}

/**
 * SetupContainer component.
 */
export const SetupContainer: React.VFC<SetupContainerProps> = (props) => {
  const { loading: hasPrimaryLoading, data: hasPrimaryData } =
    useHasPrimaryMailAccountQuery()
  const { loading: hasAdminLoading, data: hasAdminData } = useHasAdminQuery()

  const refresh = () => {
    location.reload()
  }

  if (hasPrimaryLoading && hasAdminLoading) {
    return <></>
  }

  if (!hasPrimaryData?.hasPrimaryMailAccount) {
    return <MailAccountSetup firstPrimaryMailAccount onSetup={refresh} />
  } else if (!hasAdminData?.hasAdmin) {
    return <AdminUserSetup onSetup={refresh} />
  }

  return <></>
}
