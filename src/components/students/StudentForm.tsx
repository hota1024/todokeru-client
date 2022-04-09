import { Student } from '@/graphql/generated'
import { studentSchema, StudentSchema } from '@/schemas/studentSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

/**
 * StudentForm props.
 */
export type StudentFormProps = {
  loading: boolean
  groups: { id: string; name: string }[]
  errorMessage?: string | null
  defaults?: Partial<{
    id: string
    surname: string
    name: string
    groupId: string
  }>
  onSubmit: SubmitHandler<StudentSchema>
  onDelete?: () => void
}

/**
 * StudentForm component.
 */
export const StudentForm: React.VFC<StudentFormProps> = (props) => {
  const { loading, errorMessage, defaults, groups, onSubmit, onDelete } = props
  const isNew = !defaults?.id

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: yupResolver(studentSchema),
    defaultValues: defaults,
  })

  return (
    <Card variant="outlined" component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader title={isNew ? 'お子さんの登録' : 'お子さんの情報を編集'} />
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Grid container>
            <Grid item xs={6} sx={{ pr: 1 }}>
              <TextField
                label="姓"
                fullWidth
                disabled={loading}
                error={!!errors.surname}
                helperText={errors.surname?.message}
                {...register('surname')}
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: 1 }}>
              <TextField
                label="名"
                fullWidth
                disabled={loading}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth>
            <InputLabel id="student-group-label">組・学年</InputLabel>
            <Controller
              control={control}
              name="groupId"
              defaultValue={defaults?.groupId}
              render={({ field: { value, onChange } }) => (
                <Select
                  id="groupId"
                  labelId="student-group-label"
                  label="組・学年"
                  disabled={loading}
                  defaultValue={defaults?.groupId}
                  error={!!errors.groupId}
                  onChange={onChange}
                  value={value}
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Box flexGrow={1} />
        {!isNew && onDelete && (
          <LoadingButton
            color="error"
            loading={loading}
            onClick={() => onDelete()}
          >
            お子さんの情報を削除
          </LoadingButton>
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          loading={loading}
        >
          {isNew ? '登録' : '更新'}
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
