import { Group } from '@/graphql/generated'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { BulkAction } from './BulkAction'

/**
 * GroupRow props.
 */
export type GroupRowProps = {
  group: Group
  groups: Group[]
  value: BulkAction
  onChange: (id: string, value: BulkAction) => void
}

/**
 * GroupRow component.
 */
export const GroupRow: React.VFC<GroupRowProps> = (props) => {
  const { group, groups, value, onChange } = props
  const selectId = `select-${group.id}`
  const groupsSelectId = `groups-select-${group.id}`

  const actionKind = value?.kind

  const handleChangeAction = (kind: BulkAction['kind']) => {
    if (kind === 'none') {
      onChange(group.id, { kind })
      return
    }

    if (kind === 'rename') {
      onChange(group.id, {
        kind,
        name:
          groups[groups.findIndex((g) => g.id === group.id) + 1]?.name ??
          groups[0].name,
      })
      return
    }

    if (kind === 'integrate') {
      onChange(group.id, {
        kind,
        id:
          groups[groups.findIndex((g) => g.id === group.id) + 1]?.id ??
          groups[0].id,
      })
      return
    }
  }

  console.log('action', value)

  return (
    <TableRow>
      <TableCell>
        {group.name}({group.students.length}人が所属)
      </TableCell>
      <TableCell>
        <FormControl size="small" fullWidth>
          <InputLabel id={selectId}>操作</InputLabel>
          <Select
            labelId={selectId}
            label="操作"
            value={actionKind}
            onChange={(e) =>
              handleChangeAction(e.target.value as BulkAction['kind'])
            }
          >
            <MenuItem value="none">無し</MenuItem>
            <MenuItem value="rename">クラス名を変更</MenuItem>
            <MenuItem value="integrate">別のクラスへ統合</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        {actionKind === 'rename' && (
          <TextField
            label="変更後のクラス名"
            size="small"
            fullWidth
            value={value.name}
            onChange={(e) =>
              onChange(group.id, { ...value, name: e.target.value })
            }
          />
        )}
        {actionKind === 'integrate' && (
          <FormControl size="small" fullWidth>
            <InputLabel id={groupsSelectId}>統合先のクラス</InputLabel>
            <Select
              labelId={groupsSelectId}
              label="統合先のクラス"
              value={value.id}
              onChange={(e) =>
                onChange(group.id, { ...value, id: e.target.value })
              }
            >
              {groups
                .filter((g) => g.id !== group.id)
                .map((g) => (
                  <MenuItem value={g.id} key={g.id}>
                    {g.name}({g.students.length}人が所属中)
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </TableCell>
    </TableRow>
  )
}
