import { Typography } from '@mui/material'
import { Box } from '@mui/system'

/**
 * Section props.
 */
export type SectionProps = {
  title?: string
  children?: React.ReactNode
}

/**
 * Section component.
 */
export const Section: React.VFC<SectionProps> = (props) => {
  const { title, children } = props

  return (
    <Box component="section" sx={{ mb: 4 }}>
      {title && (
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  )
}
