import { Box, Container, LinearProgress } from '@mui/material'

/**
 * FullscreenLoading props.
 */
export type FullscreenLoadingProps = {}

/**
 * FullscreenLoading component.
 */
export const FullscreenLoading: React.VFC<FullscreenLoadingProps> = (props) => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="xs">
        <LinearProgress />
      </Container>
    </Box>
  )
}
