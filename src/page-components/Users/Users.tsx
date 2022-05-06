import { useUsersWithStudentsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Grid, LinearProgress } from '@mui/material'
import { AdminHeader } from '../AdminHeader'
import { UserCard } from './UserCard'

/**
 * Users props.
 */
export type UsersProps = {}

/**
 * Users component.
 */
export const Users: React.VFC<UsersProps> = (props) => {
  const { data: usersData } = useUsersWithStudentsQuery({
    fetchPolicy: 'no-cache',
  })
  const users = usersData?.usersWithStudents

  return (
    <AdminLayout>
      <AdminHeader title="園児等一覧" />
      <Grid container spacing={2}>
        {users ? (
          users.map((user, key) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
              <UserCard user={user} />
            </Grid>
          ))
        ) : (
          <LinearProgress />
        )}
      </Grid>
    </AdminLayout>
  )
}
