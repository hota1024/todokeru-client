import {
  Group,
  useGroupsQuery,
  useIntegrateGroupMutation,
  useUpdateGroupMutation,
} from '@/graphql/generated'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { AdminHeader } from '../AdminHeader'
import { GroupRow } from './GroupRow'
import { BulkAction } from './BulkAction'
import { useConfirm } from '@/atoms/confirm'
import { useSnackbar } from 'notistack'

/**
 * GroupsBulkEdit props.
 */
export type GroupsBulkEditProps = {}

/**
 * GroupsBulkEdit component.
 */
export const GroupsBulkEdit: React.VFC<GroupsBulkEditProps> = (props) => {
  const {
    data: groupsData,
    loading: loadingData,
    refetch,
  } = useGroupsQuery({
    fetchPolicy: 'no-cache',
  })

  const confirm = useConfirm()
  const { enqueueSnackbar } = useSnackbar()
  const [updateGroup] = useUpdateGroupMutation()
  const [integrateGroup] = useIntegrateGroupMutation()
  const groups = useMemo(() => groupsData?.groups ?? [], [groupsData?.groups])
  const [actionMap, setActionMap] = useState(new Map())

  useEffect(() => {
    const actionMap = new Map<string, BulkAction>()

    groups.forEach((group) => {
      actionMap.set(group.id, { kind: 'none' })
    })

    setActionMap(actionMap)
  }, [groups])

  const handleChangeAction = (id: string, action: BulkAction) => {
    setActionMap((map) => {
      const newMap = new Map(map)

      console.log(action)

      newMap.set(id, action)

      return newMap
    })
  }

  const confirmBulkEdit = () => {
    confirm({
      title: '一括操作の確認',
      confirmText: '操作を実行する',
      confirmColor: 'success',
      description: (
        <TableContainer>
          <Table>
            {groups.map((group) => {
              const action = actionMap.get(group.id)

              return (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>
                    {action.kind === 'none' ? (
                      <span style={{ color: 'gray' }}>何もしない</span>
                    ) : action?.kind === 'rename' ? (
                      `名前を「${action.name}」に変更する`
                    ) : action?.kind === 'integrate' ? (
                      `「${
                        groups?.find((g) => g.id === action.id)?.name
                      }」に統合する`
                    ) : (
                      '不明な操作'
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </Table>
        </TableContainer>
      ),
      async onConfirm() {
        for (const group of groups) {
          const action = actionMap.get(group.id)

          if (action.kind === 'rename') {
            await updateGroup({
              variables: {
                id: group.id,
                data: {
                  name: action.name,
                  isPrivate: group.isPrivate,
                },
              },
            })
          } else if (action.kind === 'integrate') {
            await integrateGroup({
              variables: {
                id: group.id,
                otherId: action.id,
              },
            })
          }
        }

        await refetch()
        enqueueSnackbar('操作が完了しました', { variant: 'success' })
      },
    })
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="クラスの一括操作"
        previousText="クラス一覧へ"
        previousHref="/admin/groups"
      />
      <Card variant="outlined">
        {loadingData && <LinearProgress />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>操作対象のクラス</TableCell>
                <TableCell>操作タイプ</TableCell>
                <TableCell>操作内容</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups
                .filter((g) => actionMap.has(g.id))
                .map((group) => (
                  <GroupRow
                    key={group.id}
                    group={group as Group}
                    groups={groups as Group[]}
                    value={actionMap.get(group.id)!}
                    onChange={handleChangeAction}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CardActions>
          <Box flexGrow={1} />
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={confirmBulkEdit}
            disabled={![...actionMap.values()].find((a) => a.kind !== 'none')}
          >
            操作確認へ
          </Button>
        </CardActions>
      </Card>
    </AdminLayout>
  )
}
