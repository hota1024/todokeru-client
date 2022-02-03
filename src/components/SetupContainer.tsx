import { useHasPrimaryMailAccountQuery } from '@/graphql/generated'
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

  if (hasPrimaryLoading) {
    return <>loading...</>
  }

  if (!hasPrimaryData?.hasPrimaryMailAccount) {
    return (
      <MailAccountSetup firstPrimaryMailAccount onSetup={refetchHasPrimary} />
    )
  }

  return <>{props.children}</>
}
