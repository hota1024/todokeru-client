import { LoadingButtonProps } from '@mui/lab'
import { atom, useAtom } from 'jotai'
import React from 'react'

/**
 * ConfirmState type.
 */
export type ConfirmState = {
  title?: React.ReactNode
  description?: React.ReactNode
  cancelText?: string
  confirmText?: string
  confirmColor?: LoadingButtonProps['color']
  onCancel?: () => void
  onConfirm?: () => void
}

export const confirmAtom = atom<ConfirmState | null>(null)

export const useConfirm = () => {
  const [, setState] = useAtom(confirmAtom)

  return (state: ConfirmState) => {
    setState({
      ...{
        title: '実行しますか？',
        cancelText: 'キャンセル',
        confirmText: '実行',
      },
      ...state,
    })
  }
}
