import { MailWithTransportsQuery } from '@/graphql/generated'
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

/**
 * ReadDatesCard props.
 */
export type ReadDatesCardProps = {
  transports: MailWithTransportsQuery['mail']['transports']
}

/**
 * ReadDatesCard component.
 */
export const ReadDatesCard: React.VFC<ReadDatesCardProps> = (props) => {
  const { transports } = props
  const dates = transports
    .map((t) => t.readAt)
    .filter((d) => !!d)
    .map((d) => new Date(d!))
  const hours: number[] = []
  let max = 1

  for (let i = 0; i < 24; i++) {
    hours.push(dates.filter((d) => d.getHours() === i).length)
    max = Math.max(max, hours[i])
  }

  return (
    <Card variant="outlined">
      <CardHeader title="開封時間の詳細" />
      <Divider />
      <TableContainer
        component={CardContent}
        sx={{ maxHeight: 200, overflow: 'scroll' }}
      >
        <Table>
          <TableBody>
            {hours.map((c, h) => (
              <TableRow key={h}>
                <TableCell>
                  {h}時
                  {c === max && (
                    <Chip sx={{ mx: 1 }} color="info" label="開封数1位" />
                  )}
                </TableCell>
                <TableCell>{c}件開封</TableCell>
                <TableCell sx={{ width: 200 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(c / max) * 100}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
