import { useConfirm } from '@/atoms/confirm'
import { MailView } from '@/components/mails/MailView'
import { useMailLazyQuery, useSendMailMutation } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Card,
  CardActions,
  CardHeader,
  Divider,
  LinearProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { AdminHeader } from '../AdminHeader'

/**
 * MailSend props.
 */
export type MailSendProps = {}

/**
 * MailSend component.
 */
export const MailSend: React.VFC<MailSendProps> = (props) => {
  const [fetchMail, { data: mailData }] = useMailLazyQuery()
  const [sendMail] = useSendMailMutation()
  const [loading, setLoading] = useState(false)

  const confirm = useConfirm()
  const router = useRouter()
  const mail = mailData?.mail ?? null
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      fetchMail({ variables: { id: router.query.id } })
    }
  }, [fetchMail, router.query.id])

  const onSendClick = () => {
    confirm({
      title: 'メールを配信しますか？',
      description: `「${mail?.subject}」の配信を開始します。よろしいですか？`,
      confirmText: '配信する',
      async onConfirm() {
        if (typeof router.query.id !== 'string') {
          return
        }

        setLoading(true)

        try {
          await sendMail({
            variables: {
              id: router.query.id,
            },
          })
        } catch (e) {
          if (e instanceof Error) {
            enqueueSnackbar(e.message, { variant: 'error' })
          }
        }

        setLoading(false)
      },
    })
  }

  return (
    <AdminLayout>
      <AdminHeader title="メールの配信" />
      {mail ? (
        mail?.wasSent ? (
          <Alert severity="info">このメールはすでに配信されています。</Alert>
        ) : (
          <Card variant="outlined">
            <CardHeader title="プレビュー" />
            <Divider />
            <MailView isPreview mail={mail} />
            <Divider />
            <CardActions>
              <Link href={`/admin/mails/${mail.id}`} passHref>
                <LoadingButton component="a" color="success" loading={loading}>
                  編集
                </LoadingButton>
              </Link>
              <Box flexGrow={1} />
              <LoadingButton
                variant="contained"
                disableElevation
                loading={loading}
                onClick={onSendClick}
              >
                配信を開始する
              </LoadingButton>
            </CardActions>
          </Card>
        )
      ) : (
        <LinearProgress />
      )}
    </AdminLayout>
  )
}
