import { MailWithTransportsQuery, TransportStatus } from '@/graphql/generated'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

/**
 * ProgressCard props.
 */
export type ProgressCardProps = {
  transports: MailWithTransportsQuery['mail']['transports']
}

/**
 * ProgressCard component.
 */
export const ProgressCard: React.VFC<ProgressCardProps> = (props) => {
  const { transports } = props

  const total = transports.length
  const queues = transports.filter(
    (t) => t.status === TransportStatus.Queued
  ).length
  const sents = transports.filter(
    (t) => t.status === TransportStatus.Sent
  ).length
  const rejects = transports.filter(
    (t) => t.status === TransportStatus.Rejected
  ).length
  const reads = transports.filter((t) => !!t.readAt).length

  return (
    <Card variant="outlined">
      <CardHeader title="配信の進行状況" />
      <Divider />
      <TableContainer component={CardContent}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>配信済み</TableCell>
              <TableCell>
                {sents}件/{total}件
              </TableCell>
              <TableCell sx={{ minWidth: 200 }}>
                <LinearProgress
                  variant="determinate"
                  value={(sents / total) * 100}
                  valueBuffer={(queues / total) * 100}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>開封済み</TableCell>
              <TableCell>
                {reads}件/{total}件
              </TableCell>
              <TableCell sx={{ minWidth: 200 }}>
                <LinearProgress
                  variant="determinate"
                  color="success"
                  value={(reads / total) * 100}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>配信失敗</TableCell>
              <TableCell>
                {rejects}件/{total}件
              </TableCell>
              <TableCell sx={{ minWidth: 200 }}>
                <LinearProgress
                  variant="determinate"
                  color="error"
                  value={(rejects / total) * 100}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
