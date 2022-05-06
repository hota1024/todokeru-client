import {
  useGroupLazyQuery,
  useUsersWithStudentsByGroupLazyQuery,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Grid, LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminHeader } from '../AdminHeader'
import { UserCard } from '../Users/UserCard'

/**
 * GroupUsers component.
 */
export const GroupUsers: React.VFC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [fetchGroup, { data: groupData }] = useGroupLazyQuery()
  const [fetchUsers, { data: usersData }] =
    useUsersWithStudentsByGroupLazyQuery()
  const group = groupData?.group
  const users = usersData?.usersWithStudentsByGroup

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      setLoading(true)
      Promise.all([
        fetchGroup({
          variables: {
            id: router.query.id as string,
          },
        }),
        fetchUsers({
          variables: {
            groupId: router.query.id as string,
          },
        }),
      ]).then(() => {
        setLoading(false)
      })
    }
  }, [fetchGroup, fetchUsers, router.query.id])

  return (
    <AdminLayout>
      <AdminHeader
        title={group ? `「${group.name}」に所属している園児等` : '園児等一覧'}
      />
      <Grid container spacing={2}>
        {loading && <LinearProgress />}
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
function useUsersWithStudentsByGroupLzyQuery(arg0: {
  fetchPolicy: string
  variables: { groupId: string }
}): { data: any } {
  throw new Error('Function not implemented.')
}
