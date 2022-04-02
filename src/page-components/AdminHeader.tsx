import { Box, Typography } from '@mui/material'

/**
 * AdminHeader props.
 */
export type AdminHeaderProps = {
  title: string
}

/**
 * AdminHeader component.
 */
export const AdminHeader: React.VFC<AdminHeaderProps> = (props) => {
  const { title } = props

  return (
    <Box sx={{ mb: 2 }}>
      <Typography component="h2" variant="h4">
        {title}
      </Typography>
    </Box>
  )
}
