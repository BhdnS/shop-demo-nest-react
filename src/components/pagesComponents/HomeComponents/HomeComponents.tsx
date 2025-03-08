import { Box, Link } from '@mui/material'
import { styles } from './HomeComponents.styles.ts'
import { RoutesEnum } from '../../../types/enums'
import { Link as RouterLink } from 'react-router'

const HomeComponents = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.box}>
        <Link to={`/${RoutesEnum.LOGIN}`} component={RouterLink}>
          Login
        </Link>
        <Link to={RoutesEnum.REGISTER} component={RouterLink}>
          Register
        </Link>
      </Box>
    </Box>
  )
}

export default HomeComponents
