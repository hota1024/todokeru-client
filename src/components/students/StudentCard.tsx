import { Student, StudentsQuery } from '@/graphql/generated'
import { Person } from '@mui/icons-material'
import { Avatar, Card, CardHeader, Skeleton } from '@mui/material'

/**
 * StudentCard props.
 */
export type StudentCardProps = {
  student?: Partial<StudentsQuery['students'][number]>
}

/**
 * StudentCard component.
 */
export const StudentCard: React.VFC<StudentCardProps> = (props) => {
  const { student } = props
  const avatar = (
    <Avatar>
      <Person />
    </Avatar>
  )

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={avatar}
        title={
          student ? (
            `${student.surname} ${student.name}`
          ) : (
            <Skeleton variant="text" />
          )
        }
      />
    </Card>
  )
}
