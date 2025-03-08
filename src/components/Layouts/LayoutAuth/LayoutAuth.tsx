import { Box } from '@mui/material'
import { Outlet } from 'react-router'

const LayoutAuth = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default LayoutAuth
