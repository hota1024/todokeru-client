import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { AdminHeader } from '../AdminHeader'
import { useUserLazyQuery } from '@/graphql/generated'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
} from '@mui/material'

/**
 * User props.
 */
export type UserProps = {}

/**
 * User component.
 */
export const User: React.VFC<UserProps> = (props) => {
  const [fetchUser, { data: userData }] = useUserLazyQuery()
  const user = userData?.user ?? null
  const router = useRouter()

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      fetchUser({
        variables: {
          id: router.query.id,
        },
      })
    }
  }, [fetchUser, router.query.id])

  return (
    <AdminLayout>
      <AdminHeader
        title={user?.students[0]?.surname ?? '園児等の詳細'}
        previousHref="/admin/users"
        previousText="園児等"
      />

      {user ? (
        <Grid container>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="メールアドレス" />
              <Divider />
              <List>
                {user.emails.map((email) => (
                  <ListItem key={email.address}>{email.address}</ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
