import {
  useMailTemplateQuery,
  useUpdateMailTemplateMutation,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import {
  mailTemplateSchema,
  MailTemplateSchema,
} from '@/schemas/mailTemplateSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  AlertTitle,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AdminHeader } from '../AdminHeader'

/**
 * MailSettings props.
 */
export type MailSettingsProps = {}

/**
 * MailSettings component.
 */
export const MailSettings: React.VFC<MailSettingsProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const { data: mailTemplate, refetch } = useMailTemplateQuery()
  const [updateMailTemplate] = useUpdateMailTemplateMutation()
  const subjectTemplate = mailTemplate?.subjectTemplate
  const bodyTemplate = mailTemplate?.bodyTemplate
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<MailTemplateSchema>({
    resolver: yupResolver(mailTemplateSchema),
  })

  useEffect(() => {
    const loaded = subjectTemplate && bodyTemplate

    if (loaded) {
      setValue('subject', subjectTemplate)
      setValue('body', bodyTemplate)
    }

    setLoading(!loaded)
  }, [bodyTemplate, mailTemplate, setValue, subjectTemplate])

  const onSubmit: SubmitHandler<MailTemplateSchema> = async (data) => {
    setLoading(true)

    try {
      await updateMailTemplate({
        variables: data,
      })
    } catch (e) {
      if (e instanceof Error) {
        enqueueSnackbar(e.message, { variant: 'error' })
      }
    }

    refetch()
    setLoading(false)
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="メール設定"
        previousText="設定へ"
        previousHref="/admin/settings"
      />
      <Card
        component="form"
        variant="outlined"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardHeader title="メールテンプレート" />
        <Divider />
        <CardContent>
          <Stack spacing={4}>
            <Alert severity="info">
              <AlertTitle>テンプレートで使えるコード</AlertTitle>
              以下のコードは実際にメールが配信される際に対応する文字列に置換されます。
              <ul>
                <li>
                  <code>{`{orgName}`}</code> - 組織名
                </li>
                <li>
                  <code>{`{subject}`}</code> - メールの件名
                </li>
                <li>
                  <code>{`{url}`}</code> - メールのURL
                </li>
              </ul>
            </Alert>
            <TextField
              label="件名テンプレート"
              variant="outlined"
              error={!!errors.subject}
              helperText={errors.subject?.message}
              disabled={loading}
              {...register('subject')}
            />
            <TextField
              label="本文テンプレート"
              variant="outlined"
              error={!!errors.body}
              helperText={errors.body?.message}
              multiline
              rows={3}
              disabled={loading}
              {...register('body')}
            />
          </Stack>
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
    </AdminLayout>
  )
}
