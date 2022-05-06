import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { AdminHeader } from '../AdminHeader'
import { OrgNameForm } from './OrgNameForm'

/**
 * OrgSettings props.
 */
export type OrgSettingsProps = {}

/**
 * OrgSettings component.
 */
export const OrgSettings: React.VFC<OrgSettingsProps> = (props) => {
  return (
    <AdminLayout>
      <AdminHeader
        title="組織設定"
        previousText="設定へ"
        previousHref="/admin/settings"
      />
      <OrgNameForm />
    </AdminLayout>
  )
}
