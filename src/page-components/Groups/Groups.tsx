import {
  Group,
  useGroupsQuery,
  useUpdateGroupOrderMutation,
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
  Stack,
} from '@mui/material'
import { arrayMoveImmutable } from 'array-move'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { Container, Draggable, OnDropCallback } from 'react-smooth-dnd'
import { AdminHeader } from '../AdminHeader'

/**
 * Groups props.
 */
export type GroupsProps = {}

/**
 * Groups component.
 */
export const Groups: React.VFC<GroupsProps> = (props) => {
  const {
    data: groupsData,
    loading: loadingData,
    refetch,
  } = useGroupsQuery({
    fetchPolicy: 'no-cache',
  })
  const [updateGroupOrder] = useUpdateGroupOrderMutation()

  const [orderEditable, setOrderEditable] = useState(false)
  const [orderState, setOrderState] = useState<typeof groups>([])
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const groups = useMemo(() => groupsData?.groups ?? [], [groupsData?.groups])

  useEffect(() => {
    if (orderEditable) {
      setOrderState(groups ?? [])
    }
  }, [groups, orderEditable])

  const onDrop: OnDropCallback = ({ removedIndex, addedIndex }) => {
    if (loading) {
      return
    }
    if (typeof removedIndex === 'number' && typeof addedIndex === 'number') {
      setOrderState((groups) =>
        arrayMoveImmutable(groups, removedIndex, addedIndex)
      )
      setOrderState((groups) => {
        return groups.map((group, index) => ({ ...group, order: index }))
      })
    }
  }

  const updateOrder = async () => {
    setLoading(true)

    try {
      for (const group of orderState) {
        console.log(group)
        await updateGroupOrder({
          variables: {
            id: group.id,
            data: {
              order: group.order,
            },
          },
        })
      }
      await refetch()
      enqueueSnackbar('?????????????????????????????????', { variant: 'success' })
      setOrderEditable(false)
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(`??????????????????????????????: ${error.message}`, {
          variant: 'error',
        })
      }
    }

    setLoading(false)
  }

  return (
    <AdminLayout>
      <AdminHeader
        title="??????????????????"
        previousText="??????????????????"
        previousHref="/admin/groups"
      />
      <Card variant="outlined">
        {loadingData && <LinearProgress />}
        <List subheader={<ListSubheader>???????????????</ListSubheader>}>
          <Divider />
          {orderEditable ? (
            <>
              <ListItem>
                <ListItemText>
                  <Alert>
                    ??????????????????????????????????????????????????????????????????????????????
                  </Alert>
                </ListItemText>
              </ListItem>
              <Container lockAxis="y" onDrop={onDrop}>
                {orderState.map((group) => (
                  <Draggable key={group.id}>
                    <ListItem>
                      <ListItemText
                        primary={group.name}
                        secondary={`${group.order}??????`}
                      />
                    </ListItem>
                  </Draggable>
                ))}
              </Container>
            </>
          ) : (
            groups.map((group, index) => (
              <Box key={group.id}>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <Link href={`/admin/groups/${group.id}`} passHref>
                        <Button color="success">????????????</Button>
                      </Link>
                      <Link href={`/admin/groups/${group.id}/users`} passHref>
                        <Button>???????????????</Button>
                      </Link>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={group.name}
                    secondary={`${group.students.length}??????????????????${
                      group.isPrivate ? '??????????????????' : '???????????????'
                    }`}
                  />
                </ListItem>
                {index !== groups.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </List>
        <Divider />
        <CardActions>
          <Box flexGrow={1} />
          {orderEditable ? (
            <>
              <LoadingButton
                onClick={() => setOrderEditable(false)}
                loading={loading}
              >
                ???????????????
              </LoadingButton>
              <LoadingButton
                variant="contained"
                disableElevation
                loading={loading}
                onClick={updateOrder}
              >
                ??????????????????
              </LoadingButton>
            </>
          ) : (
            <>
              <Button color="success" onClick={() => setOrderEditable(true)}>
                ??????????????????????????????
              </Button>
              <Link href="/admin/groups/new" passHref>
                <Button component="a">???????????????????????????</Button>
              </Link>
            </>
          )}
        </CardActions>
      </Card>
    </AdminLayout>
  )
}
