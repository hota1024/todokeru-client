import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Button } from '@mui/material'
import Link from 'next/link'
import { AdminHeader } from '../AdminHeader'

/**
 * Mails props.
 */
export type MailsProps = {}

/**
 * Mails component.
 */
export const Mails: React.VFC<MailsProps> = (props) => {
  return (
    <AdminLayout>
      <AdminHeader title="メール" />
      <Link href="/mails/new" passHref>
        <Button component="a">メールを作成</Button>
      </Link>
    </AdminLayout>
  )
}
