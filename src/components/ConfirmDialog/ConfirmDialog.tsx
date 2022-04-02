import { confirmAtom } from '@/atoms/confirm'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { Box } from '@mui/system'
import { useAtom } from 'jotai'
import { useState } from 'react'

/**
 * ConfirmDialog props.
 */
export type ConfirmDialogProps = {}

/**
 * ConfirmDialog component.
 */
export const ConfirmDialog: React.VFC<ConfirmDialogProps> = (props) => {
  const [state, setState] = useAtom(confirmAtom)
  const [loading, setLoading] = useState(false)

  const onAction = async (action?: () => void) => {
    if (action) {
      setLoading(true)
      await action()
      setLoading(false)
    }

    setState(null)
  }

  return (
    <Dialog open={!!state} maxWidth="sm">
      <DialogTitle>{state?.title}</DialogTitle>
      <DialogContent>{state?.description}</DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          onClick={() => onAction(state?.onCancel)}
        >
          {state?.cancelText}
        </LoadingButton>
        <Box flexGrow={1} />
        <LoadingButton
          loading={loading}
          variant="contained"
          disableElevation
          color={state?.confirmColor}
          onClick={() => onAction(state?.onConfirm)}
        >
          {state?.confirmText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
