import { styles } from './NavBar.styles.ts'
import { List, ListItem, Link, Button, Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { RoleEnum } from '../../../types/enums'
import { AdminNavLinks, ShopNavLinks } from '../../../utils/constants'
import { Link as RouterLink } from 'react-router'
import { useLogoutMutation } from '../../../redux/auth/authApiSlice.ts'
import { logOut } from '../../../redux/auth/authSlice.ts'

const NavBar = () => {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const role = useAppSelector((state) => state.auth.role)

  const handleLogout = () => {
    logout().unwrap()
    dispatch(logOut())
  }

  const links = role === RoleEnum.ADMIN ? AdminNavLinks : ShopNavLinks

  return (
    <Box sx={styles.wrapper}>
      <List sx={styles.list}>
        {links.map((link) => (
          <ListItem key={link.id}>
            <Link to={link.link} component={RouterLink}>
              {link.title}
            </Link>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  )
}

export default NavBar
