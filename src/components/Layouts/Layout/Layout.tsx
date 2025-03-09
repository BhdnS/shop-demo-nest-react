import { Box } from '@mui/material'
import NavBar from '../../pagesComponents/NavBar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  )
}

export default Layout
