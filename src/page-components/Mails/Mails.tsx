import { useMailsQuery } from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { formatDateTime } from '@/utils/formatDateTime'
import { Add, Mail } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { group } from 'console'
import Link from 'next/link'
import { AdminHeader } from '../AdminHeader'

/**
 * Mails props.
 */
export type MailsProps = {}

/**
 * Mails component.
 */
export const Mails: React.VFC<MailsProps> = (props) => {
  const { data: mailsData, loading: mailsLoading } = useMailsQuery({
    fetchPolicy: 'no-cache',
  })

  const mails = mailsData?.mails ?? []

  const columns: GridColDef<typeof mails[number]>[] = [
    {
      field: 'edit',
      headerName: '編集',
      renderCell: (p) => (
        <>
          <Link href={`/admin/mails/${p.row.id}`} passHref>
            <Button component="a" color="success">
              編集
            </Button>
          </Link>
        </>
      ),
    },
    {
      field: 'subject',
      headerName: '件名',
      width: 200,
    },
    {
      field: 'body',
      headerName: '本文',
      width: 200,
    },
    {
      field: 'groups',
      headerName: '送り先',
      width: 400,
      renderCell: (p) => (
        <>
          {p.row.groups.map((g) => (
            <Link key={g.id} href={`/admin/groups/${g.id}`} passHref>
              <Chip component="a" label={g.name} sx={{ mr: 1 }} />
            </Link>
          ))}
        </>
      ),
    },
    {
      field: 'buttons',
      headerName: '操作',
      width: 160,
      renderCell: (p) => (
        <>
          {p.row.wasSent ? (
            <Link href={`/admin/mails/${p.row.id}/status`} passHref>
              <Button
                component="a"
                color="secondary"
                variant="contained"
                disableElevation
              >
                配信状況
              </Button>
            </Link>
          ) : (
            <Link href={`/admin/mails/${p.row.id}/send`} passHref>
              <Button
                component="a"
                color="primary"
                variant="contained"
                disableElevation
              >
                配信を始める
              </Button>
            </Link>
          )}
        </>
      ),
    },
  ]

  return (
    <AdminLayout>
      <AdminHeader title="メール" />
      <Box mb={3}>
        <Link href="/admin/mails/new" passHref>
          <Button
            component="a"
            size="large"
            variant="contained"
            disableElevation
            startIcon={<Add />}
          >
            メールを作成する
          </Button>
        </Link>
      </Box>
      <Box width="100%" height={600}>
        <DataGrid
          loading={mailsLoading}
          rows={mails}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
        />
      </Box>
    </AdminLayout>
  )
}
