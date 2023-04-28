import { UsersWithStudentsQuery } from '@/graphql/generated'
import { AccountCircle } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'

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

  console.log(user)

  return (
    <Card variant="outlined">
      <Link href={`/admin/users/${user.id}`} passHref>
        <CardActionArea>
          <CardHeader
            title={
              surnames
                ? `${surnames}(${user.students.length}人が登録済み)`
                : '名無し'
            }
            subheader={`${
              user.emails[0]?.address ?? 'メールアドレスが登録されていません'
            }${user.emails.length > 1 ? `(+${user.emails.length - 1})` : ''}`}
            avatar={
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <AccountCircle />
              </Avatar>
            }
            sx={{ minHeight: 86 }}
          />
        </CardActionArea>
      </Link>
      <Divider />
      <List sx={{ height: 160, overflowY: 'scroll' }}>
        {user.students.length === 0 && (
          <ListItem>
            <ListItemText primary="お子さんが登録されていません。" />
          </ListItem>
        )}
        {user.students.map((student, key) => (
          <Box key={key}>
            <ListItem disablePadding>
              <Link href={`/admin/students/${student.id}`} passHref>
                <ListItemButton component="a">
                  <ListItemText
                    primary={`${student.surname} ${student.name}`}
                    secondary={student.group.name}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            {key !== user.students.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Card>
  )
}
