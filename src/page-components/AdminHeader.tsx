import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

/**
 * AdminHeader props.
 */
export type AdminHeaderProps = {
  title: string
  previousText?: string
  previousHref?: string
}

/**
 * AdminHeader component.
 */
export const AdminHeader: React.VFC<AdminHeaderProps> = (props) => {
  const { title, previousText, previousHref } = props
  const hasPrevious = !!previousText && !!previousHref

  return (
    <Box sx={{ mb: 2 }}>
      {hasPrevious && (
        <Link href={previousHref} passHref>
          <Button color="inherit">{previousText}</Button>
        </Link>
      )}
      <Typography component="h2" variant="h4">
        {title}
      </Typography>
    </Box>
  )
}
