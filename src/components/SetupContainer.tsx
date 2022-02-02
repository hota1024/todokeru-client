import { useHasPrimaryMailAccountQuery } from '@/graphql/generated'
import { Setup } from '@/page-components/Setup/Setup'

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
  const { loading, data } = useHasPrimaryMailAccountQuery()

  if (loading) {
    return <>loading...</>
  }

  if (!data?.hasPrimaryMailAccount) {
    return <Setup />
  }

  return <>{props.children}</>
}
