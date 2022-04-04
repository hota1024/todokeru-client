import { useConfirm } from '@/atoms/confirm'
import {
  Email,
  useDeleteUserEmailMutation,
  useMeQuery,
} from '@/graphql/generated'
import { UserLayout } from '@/layouts/UserLayout/UserLayout'
import { AdminHeader } from '@/page-components/AdminHeader'
import { formatDateTime } from '@/utils/formatDateTime'
import { Mail } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { NextPage } from 'next'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

/**
 * Settings page.
 */
export const SettingsPage: NextPage = () => {
  // mutations
  const [deleteEmailMut] = useDeleteUserEmailMutation()

  // queries
  const { data: meData } = useMeQuery()

  // hooks
  const confirm = useConfirm()
  const { enqueueSnackbar } = useSnackbar()

  // states
  const [loading, setLoading] = useState(false)

  const deleteEmail = async (email: { id: string; address: string }) => {
    confirm({
      title: 'メールアドレスを削除しますか？',
      description: `${email.address} を本当に削除しますか？`,
      confirmColor: 'error',
      confirmText: '削除する',
      async onConfirm() {
        setLoading(true)

        try {
          await deleteEmailMut({
            variables: {
              id: email.id,
            },
          })
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(error.message, {
              variant: 'error',
            })
          }
        }

        setLoading(false)
      },
    })
  }

  const emails = meData?.me?.emails || []

  return (
    <UserLayout>
      <AdminHeader
        title="受け取り設定"
        previousText="ユーザーメニューへ"
        previousHref="/"
      />
      <Card variant="outlined">
        <List subheader={<ListSubheader>メールアドレス一覧</ListSubheader>}>
          <Divider />
          {!meData && <LinearProgress />}
          {emails.map((email) => (
            <ListItem
              key={email.id}
              secondaryAction={
                <LoadingButton
                  color="error"
                  onClick={() => deleteEmail(email)}
                  loading={loading}
                >
                  削除
                </LoadingButton>
              }
            >
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText
                primary={email.address}
                secondary={`最後の認証日時 ${
                  email.lastConfirmedAt
                    ? formatDateTime(new Date(email.lastConfirmedAt))
                    : 'まだ認証されていません。'
                }`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <CardActions>
          <Box flexGrow={1} />
          <LoadingButton variant="contained" disableElevation loading={loading}>
            メールアドレスを追加する
          </LoadingButton>
        </CardActions>
      </Card>
    </UserLayout>
  )
}

export default SettingsPage
