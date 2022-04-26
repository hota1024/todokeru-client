import { useConfirm } from '@/atoms/confirm'
import { TransportQuery, useResendTransportMutation } from '@/graphql/generated'
import { formatDateTime } from '@/utils/formatDateTime'
import { Replay } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

/**
 * TransportStatusCard props.
 */
export type TransportStatusCardProps = {
  transport: TransportQuery['transport']
}

/**
 * TransportStatusCard component.
 */
export const TransportRejectCard: React.VFC<TransportStatusCardProps> = (
  props
) => {
  const { transport } = props

  const [resend] = useResendTransportMutation()
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const confirm = useConfirm()

  const onResendClick = () => {
    confirm({
      title: 'メールを再送しますか？',
      confirmText: '再送する',
      async onConfirm() {
        setLoading(true)

        try {
          await resend({
            variables: {
              id: transport.id,
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
    <Card variant="outlined">
      <CardHeader title="エラー状態" />
      <Divider />
      <CardContent>
        {transport.rejectedReason ? (
          <Box>
            <Box
              component="pre"
              sx={{ padding: 2, bgcolor: '#f0f0f0', borderRadius: 1 }}
            >
              <code>{transport.rejectedReason}</code>
            </Box>
            <LoadingButton
              variant="contained"
              disableElevation
              startIcon={<Replay />}
              loading={loading}
              onClick={onResendClick}
            >
              再配信する
            </LoadingButton>
          </Box>
        ) : (
          <Alert severity="info">エラーは発生していません。</Alert>
        )}
      </CardContent>
    </Card>
  )
}
