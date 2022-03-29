import { Box, Container, LinearProgress, Typography } from '@mui/material'

const types = {
  default: '読込中です...',
  authenticating: '認証中です...',
} as const

/**
 * FullscreenLoading props.
 */
export type FullscreenLoadingProps = {
  type?: keyof typeof types
}

/**
 * FullscreenLoading component.
 */
export const FullscreenLoading: React.VFC<FullscreenLoadingProps> = (props) => {
  const message = types[props.type ?? 'default']

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="xs">
        <Typography variant="h6" textAlign="center">
          {message}
        </Typography>
        <LinearProgress />
      </Container>
    </Box>
  )
}
