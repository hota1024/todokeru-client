import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { AdminHeader } from '../AdminHeader'

/**
 * MailSend props.
 */
export type MailSendProps = {}

/**
 * MailSend component.
 */
export const MailSend: React.VFC<MailSendProps> = (props) => {
  return (
    <AdminLayout>
      <AdminHeader title="メールの配信" />
    </AdminLayout>
  )
}
