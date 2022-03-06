import {
  useHasAdminQuery,
  useHasPrimaryMailAccountQuery,
} from '@/graphql/generated'
import { AdminUserSetup } from '@/page-components/Setup/AdminUserSetup'
import { MailAccountSetup } from '@/page-components/Setup/MailAccountSetup'

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
  const {
    loading: hasPrimaryLoading,
    data: hasPrimaryData,
    refetch: refetchHasPrimary,
  } = useHasPrimaryMailAccountQuery()

  const {
    loading: hasAdminLoading,
    data: hasAdminData,
    refetch: refetchHasAdmin,
  } = useHasAdminQuery()

  if (hasPrimaryLoading && hasAdminLoading) {
    return <>loading...</>
  }

  if (!hasPrimaryData?.hasPrimaryMailAccount) {
    return (
      <MailAccountSetup firstPrimaryMailAccount onSetup={refetchHasPrimary} />
    )
  }

  if (!hasAdminData?.hasAdmin) {
    return <AdminUserSetup onSetup={refetchHasAdmin} />
  }

  return <>{props.children}</>
}
