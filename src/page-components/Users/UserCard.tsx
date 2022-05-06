import { UsersWithStudentsQuery } from '@/graphql/generated'
import { AccountCircle } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

/**
 * UserCard props.
 */
export type UserCardProps = {
  user: UsersWithStudentsQuery['usersWithStudents'][number]
}

/**
 * UserCard component.
 */
export const UserCard: React.VFC<UserCardProps> = (props) => {
  const { user } = props
  const surnames = [
    ...new Set(user.students.map((student) => student.surname)),
  ].join(', ')

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          surnames
            ? `${surnames}(${user.students.length}人が登録済み)`
            : '名無し'
        }
        subheader={user.emails.map((e) => e.address).join(', ')}
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AccountCircle />
          </Avatar>
        }
        sx={{ minHeight: 86 }}
      />
      <Divider />
      <List sx={{ height: 160, overflowY: 'scroll' }}>
        {user.students.length === 0 && (
          <ListItem>
            <ListItemText primary="お子さんが登録されていません。" />
          </ListItem>
        )}
        {user.students.map((student, key) => (
          <Box key={key}>
            <ListItem>
              <ListItemText
                primary={`${student.surname} ${student.name}`}
                secondary={student.group.name}
              />
            </ListItem>
            {key !== user.students.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Card>
  )
}
