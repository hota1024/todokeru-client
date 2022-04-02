import {
  useEndRegisterReceptionMutation,
  useRegisterationStatusQuery,
  useStartRegisterReceptionMutation,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { formatDateTime } from '@/utils/formatDateTime'
import { ContentCopy, Download } from '@mui/icons-material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import QRCode from 'qrcode'
import {
  Button,
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { AdminHeader } from '../AdminHeader'
import { Section } from '../Section'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useConfirm } from '@/atoms/confirm'

/**
 * RegisterationSettings props.
 */
export type RegisterationSettingsProps = {}

/**
 * RegisterationSettings component.
 */
export const RegisterationSettings: React.VFC<RegisterationSettingsProps> = (
  props
) => {
  const { enqueueSnackbar } = useSnackbar()
  const { data: statusData, refetch: refetchStatus } =
    useRegisterationStatusQuery()
  const [startReception] = useStartRegisterReceptionMutation()
  const [endReception] = useEndRegisterReceptionMutation()
  const { registerationStatus: status } = statusData || {}
  const [qrcodeUrl, setQrcodeUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const confirm = useConfirm()
  const url = status?.token
    ? `${process.env.NEXT_PUBLIC_HOST}/r/${status.token}`
    : null

  const toggleReceptionStatus = async () => {
    if (!status) {
      return
    }

    let action: () => Promise<void>

    const executeAction = async () => {
      setLoading(true)
      await action()

      await refetchStatus()
      setLoading(false)
    }

    if (status.isReceptable) {
      action = async () => {
        await endReception()
        enqueueSnackbar('受付を終了しました。', { variant: 'success' })
      }

      confirm({
        title: '受付を終了しますか？',
        description:
          '再度受付を開始する際に受付URLとQRコードが再発行されるため、現在のURLとQRコードは利用できなくなります。',
        confirmColor: 'error',
        confirmText: '受付を終了する',
        onConfirm: executeAction,
      })
    } else {
      action = async () => {
        await startReception()
        enqueueSnackbar('受付を開始しました。', { variant: 'success' })
      }

      confirm({
        title: '受付を開始しますか？',
        description: '受付を開始すると、受付URLとQRコードが発行されます。',
        confirmColor: 'primary',
        confirmText: '受付を開始する',
        onConfirm: executeAction,
      })
    }
  }

  useEffect(() => {
    if (!url) {
      return
    }

    setQrcodeUrl(null)

    QRCode.toDataURL(url, (err, url) => {
      if (err) {
        enqueueSnackbar('QRコードの生成に失敗しました', { variant: 'error' })
        return
      }

      setQrcodeUrl(url)
    })
  }, [enqueueSnackbar, url])

  return (
    <AdminLayout>
      <AdminHeader title="登録設定" />
      <Section title="受付状態">
        <Card variant="outlined" sx={{ maxWidth: 700 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th">受付状態</TableCell>
                <TableCell>
                  <Typography
                    fontSize="inherit"
                    color={status?.isReceptable ? 'primary' : 'error'}
                  >
                    {status ? (
                      status.isReceptable ? (
                        '登録を受付中です。'
                      ) : (
                        '現在登録を受け付けていません。'
                      )
                    ) : (
                      <Skeleton />
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    disableElevation
                    disabled={!status}
                    color={status?.isReceptable ? 'error' : 'primary'}
                    onClick={toggleReceptionStatus}
                    loading={loading || !status}
                  >
                    {status?.isReceptable ? '受付を終了' : '受付を開始'}
                  </LoadingButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">受付開始日時</TableCell>
                <TableCell>
                  {status?.receptionStartedAt &&
                    formatDateTime(new Date(status.receptionStartedAt))}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">受付開始からの登録人数</TableCell>
                <TableCell>
                  {typeof status?.registeredStudents === 'number' ? (
                    `${status.registeredStudents}人`
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">
                  受付開始からの登録メールアドレス数
                </TableCell>
                <TableCell>
                  {typeof status?.registeredEmails === 'number' ? (
                    `${status.registeredEmails}個`
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Section>
      <Section title="受付情報">
        <Card variant="outlined" sx={{ maxWidth: 700 }}>
          {status?.isReceptable ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th">受付URL</TableCell>
                  <TableCell>
                    {url ? (
                      <code
                        style={{
                          display: 'inline-block',
                          width: 300,
                          overflowX: 'scroll',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {url}
                      </code>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell>
                    <CopyToClipboard
                      text={url ?? ''}
                      onCopy={() =>
                        enqueueSnackbar('URLをコピーしました。', {
                          variant: 'success',
                        })
                      }
                    >
                      <Button fullWidth startIcon={<ContentCopy />}>
                        URLをコピー
                      </Button>
                    </CopyToClipboard>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">受付QRコード</TableCell>
                  <TableCell>
                    {qrcodeUrl ? (
                      <Image
                        src={qrcodeUrl}
                        alt="受付QRコード"
                        width="200"
                        height="200"
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={200}
                        height={200}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <a href={qrcodeUrl ?? ''} download="qrcode.png">
                      <Button
                        fullWidth
                        startIcon={<Download />}
                        onClick={() =>
                          enqueueSnackbar(
                            'QRコードのダウンロードを開始しました。',
                            { variant: 'info' }
                          )
                        }
                      >
                        ダウンロード
                      </Button>
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <CardContent>
              登録の受付を開始すると、ここに受付情報が表示されます。
            </CardContent>
          )}
        </Card>
      </Section>
    </AdminLayout>
  )
}
