import { Container, Box, Typography } from '@mui/material'

/**
 * SetupLayout props.
 */
export type SetupLayoutProps = {
  children: React.ReactNode
}

/**
 * SetupLayout component.
 */
export const SetupLayout: React.VFC<SetupLayoutProps> = (props) => {
  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <Typography variant="h3">セットアップ</Typography>
        <Typography color="text.secondary">
          利用を開始するにはセットアップを行う必要があります。
        </Typography>
        <Box py={4}>{props.children}</Box>
      </Box>
    </Container>
  )
}
