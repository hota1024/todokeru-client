import { StudentCard } from '@/components/students/StudentCard'
import { useStudentsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Grid } from '@mui/material'
import { useMemo } from 'react'
import { AdminHeader } from '../AdminHeader'

/**
 * Students props.
 */
export type StudentsProps = {}

/**
 * Students component.
 */
export const Students: React.VFC<StudentsProps> = (props) => {
  const { data: studentsData, loading: studentsLoading } = useStudentsQuery({
    fetchPolicy: 'no-cache',
  })

  const students = studentsData?.students ?? []

  return (
    <AdminLayout>
      <AdminHeader title="園児等一覧" />
      <Grid container spacing={2}>
        {studentsLoading &&
          [...Array(24)].map((_, key) => (
            <Grid item xs={12} md={4} lg={3} key={key}>
              <StudentCard />
            </Grid>
          ))}
        {students.map((student) => (
          <Grid item xs={12} md={4} lg={3} key={student.id}>
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
    </AdminLayout>
  )
}
