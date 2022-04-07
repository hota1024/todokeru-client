import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { AdminHeader } from '../AdminHeader'

/**
 * Dashboard props.
 */
export type DashboardProps = {}

/**
 * Dashboard component.
 */
export const Dashboard: React.VFC<DashboardProps> = (props) => {
  return (
    <AdminLayout>
      <AdminHeader title="ダッシュボード" />
    </AdminLayout>
  )
}
