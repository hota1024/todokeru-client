import { MailWithTransportsQuery, TransportStatus } from '@/graphql/generated'
import { formatDateTime } from '@/utils/formatDateTime'
import {
  HourglassTop,
  ErrorOutline as ErrorIcon,
  Drafts,
  Mail,
} from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { Box } from '@mui/system'

/**
 * TransportCard props.
 */
export type TransportCardProps = {
  transport: MailWithTransportsQuery['mail']['transports'][number]
}

/**
 * TransportCard component.
 */
export const TransportCard: React.VFC<TransportCardProps> = (props) => {
  const { transport } = props
  const { students } = transport

  let status
  let subheader
  let avatar
  let color

  if (transport.status === TransportStatus.Queued) {
    status = '配信待ち'
    subheader = `配信待ち中のメールです。`
    color = '#212121'
    avatar = (
      <Avatar sx={{ bgcolor: color }}>
        <HourglassTop />
      </Avatar>
    )
  } else if (transport.status === TransportStatus.Rejected) {
    status = 'エラー'
    subheader = `配信に失敗しました。`
    color = '#f44336'
    avatar = (
      <Avatar sx={{ bgcolor: color }}>
        <ErrorIcon />
      </Avatar>
    )
  } else if (transport.status === TransportStatus.Sending) {
    status = '配信中...'
    subheader = `配信処理を行っています。`
    color = '#616161'
    avatar = (
      <Avatar sx={{ bgcolor: color }}>
        <CircularProgress size={24} color="inherit" />
      </Avatar>
    )
  } else if (true || transport.status === TransportStatus.Sent) {
    if (transport.readAt) {
      status = '開封済み'
      subheader = `${formatDateTime(
        new Date(transport.readAt)
      )}に開封されました。`
      color = '#4CAF50'
      avatar = (
        <Avatar sx={{ bgcolor: color }}>
          <Drafts />
        </Avatar>
      )
    } else {
      status = '配信済み'
      subheader = `配信済みのメールです。`
      color = '#2196F3'
      avatar = (
        <Avatar sx={{ bgcolor: color }}>
          <Mail />
        </Avatar>
      )
    }
  }

  return (
    <>
      <Card variant="outlined" sx={{ border: `1px solid ${color}` }}>
        <CardHeader avatar={avatar} title={status} subheader={subheader} />
        <Divider />
        <List>
          {students.map((student, index) => (
            <Box key={student.id}>
              <ListItem>
                <ListItemText
                  primary={`${student.surname} ${student.name}`}
                  secondary={student.group.name}
                />
              </ListItem>
              {index < students.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Card>
    </>
  )
}
