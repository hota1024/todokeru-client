import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { Box, Button, Typography } from '@mui/material'
import { NextPage } from 'next'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4">Template</Typography>
          <Button>hello world</Button>
        </Box>
      </AdminLayout>
    </>
  )
}

export default HomePage
