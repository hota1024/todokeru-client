import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SetupFormData, setupFormSchema } from './SetupFormData'

/**
 * Setup props.
 */
export type SetupProps = {}

/**
 * Setup component.
 */
export const Setup: React.VFC<SetupProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupFormData>({
    resolver: yupResolver(setupFormSchema),
  })

  const onSubmit: SubmitHandler<SetupFormData> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Container maxWidth="md">
        <Box py={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card variant="outlined">
              <CardHeader title="セットアップ" />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    {...register('organizationName')}
                    label="組織名"
                    variant="filled"
                    error={!!errors.organizationName}
                    helperText={errors.organizationName?.message}
                  />
                  <TextField
                    {...register('adminEmail')}
                    label="管理者のメールアドレス"
                    variant="filled"
                    type="email"
                    error={!!errors.adminEmail}
                    helperText={errors.adminEmail?.message}
                  />
                </Stack>
              </CardContent>
              <Divider />
              <CardActions>
                <Button type="submit" variant="contained" disableElevation>
                  完了
                </Button>
              </CardActions>
            </Card>
          </form>
        </Box>
      </Container>
    </>
  )
}
