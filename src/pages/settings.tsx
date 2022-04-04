import { useConfirm } from '@/atoms/confirm'
import {
  Email,
  useDeleteUserEmailMutation,
  useMeQuery,
} from '@/graphql/generated'
import { UserLayout } from '@/layouts/UserLayout/UserLayout'
import { AdminHeader } from '@/page-components/AdminHeader'
import { formatDateTime } from '@/utils/formatDateTime'
import { Mail, Person } from '@mui/icons-material'
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
  Stack,
} from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

/**
 * Settings page.
 */
export const SettingsPage: NextPage = () => {
  // mutations
  const [deleteEmailMut] = useDeleteUserEmailMutation()

  // queries
  const { data: meData, refetch: refetchMe } = useMeQuery({
    fetchPolicy: 'no-cache',
  })

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
          await refetchMe()
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

  const emails = meData?.me?.emails ?? []
  const students = meData?.me?.students ?? []
  const surname = students[0] ? students[0].surname : ''

  return (
    <UserLayout>
      <AdminHeader
        title="受け取り設定"
        previousText="ユーザーメニューへ"
        previousHref="/"
      />
      <Stack spacing={2}>
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
            <Link href="/settings/add-email" passHref>
              <LoadingButton
                component="a"
                variant="contained"
                disableElevation
                loading={loading}
              >
                メールアドレスを追加する
              </LoadingButton>
            </Link>
          </CardActions>
        </Card>

        <Card variant="outlined">
          <List subheader={<ListSubheader>お子様一覧</ListSubheader>}>
            <Divider />
            {!meData && <LinearProgress />}
            {students.length === 0 && meData && (
              <ListItem>
                <ListItemText>まだ登録されていません。</ListItemText>
              </ListItem>
            )}
            {students.map((student) => (
              <Link
                href={`/settings/students/${student.id}`}
                passHref
                key={student.id}
              >
                <ListItem component="a" button key={student.id}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${student.surname} ${student.name}`}
                    secondary={student.group.name}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <CardActions>
            <Box flexGrow={1} />
            <Link
              href={`/settings/students/new${
                surname ? `?surname=${surname}` : ''
              }`}
              passHref
            >
              <LoadingButton
                component="a"
                variant="contained"
                disableElevation
                loading={loading}
              >
                お子様を登録する
              </LoadingButton>
            </Link>
          </CardActions>
        </Card>
      </Stack>
    </UserLayout>
  )
}

export default SettingsPage
