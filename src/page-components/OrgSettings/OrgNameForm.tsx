import { useOrgName } from '@/atoms/org'
import { useOrgNameQuery, useUpdateOrgMutation } from '@/graphql/generated'
import { orgNameSchema, OrgNameSchema } from '@/schemas/orgNameSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

/**
 * OrgNameForm props.
 */
export type OrgNameFormProps = {}

/**
 * OrgNameForm component.
 */
export const OrgNameForm: React.VFC<OrgNameFormProps> = (props) => {
  const { data: orgNameData, refetch } = useOrgNameQuery()
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [updateOrg] = useUpdateOrgMutation()
  const [, setOrgName] = useOrgName()
  const orgName = orgNameData?.orgName

  const { setValue, handleSubmit, register } = useForm<OrgNameSchema>({
    resolver: yupResolver(orgNameSchema),
  })

  useEffect(() => {
    if (orgName) {
      setValue('orgName', orgName)
    }
    setLoading(typeof orgName === 'undefined')
  }, [orgName, setValue])

  const onSubmit: SubmitHandler<OrgNameSchema> = async (data) => {
    setLoading(true)

    try {
      await updateOrg({
        variables: {
          data: {
            orgName: data.orgName,
          },
        },
      })
      setOrgName(data.orgName)
    } catch (e) {
      if (e instanceof Error) {
        enqueueSnackbar(e.message, { variant: 'error' })
      }
    }

    await refetch()
    setLoading(false)
  }

  return (
    <Card component="form" variant="outlined" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader title="組織名" />
      <Divider />
      <CardContent>
        <TextField
          label="組織名"
          variant="filled"
          fullWidth
          disabled={loading}
          {...register('orgName')}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Box flexGrow={1} />
        <LoadingButton
          type="submit"
          variant="contained"
          disableElevation
          loading={loading}
        >
          保存
        </LoadingButton>
      </CardActions>
    </Card>
  )
}
