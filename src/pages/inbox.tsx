import { UserLayout } from '@/layouts/UserLayout/UserLayout'
import { AdminHeader } from '@/page-components/AdminHeader'
import { Alert } from '@mui/material'
import { NextPage } from 'next'

/**
 * Inbox page.
 */
export const InboxPage: NextPage = () => {
  return (
    <UserLayout>
      <AdminHeader
        title="受信トレイ"
        previousText="ユーザーメニューへ"
        previousHref="/"
      />
      <Alert severity="warning">
        現在、この機能は準備中です。お使いのメールクライアントからお知らせメールをご確認ください。
      </Alert>
    </UserLayout>
  )
}

export default InboxPage
