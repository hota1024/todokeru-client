import { useGroupsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import Link from 'next/link'
import { AdminHeader } from '../AdminHeader'

/**
 * Groups props.
 */
export type GroupsProps = {}

/**
 * Groups component.
 */
export const Groups: React.VFC<GroupsProps> = (props) => {
  const { data: groupsData, loading: loadingData } = useGroupsQuery({
    fetchPolicy: 'no-cache',
  })

  const groups = groupsData?.groups ?? []

  return (
    <AdminLayout>
      <AdminHeader title="クラスの管理" />
      <Card variant="outlined">
        {loadingData && <LinearProgress />}
        <List subheader={<ListSubheader>クラス一覧</ListSubheader>}>
          {groups.map((group) => (
            <Link href={`/admin/groups/${group.id}`} passHref key={group.id}>
              <ListItem component="a" button>
                <ListItemText
                  primary={group.name}
                  secondary={`${group.students.length}人が所属中`}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <CardActions>
          <Box flexGrow={1} />
          <Link href="/admin/groups/new" passHref>
            <Button component="a">新しいクラスを追加</Button>
          </Link>
        </CardActions>
      </Card>
    </AdminLayout>
  )
}
