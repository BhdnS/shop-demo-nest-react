import { styles } from './ProductsPage.styles.ts'
import { Box } from '@mui/material'
import { useAppSelector } from '../../hooks'
import ProductForm from '../../components/pagesComponents/ProductForm'
import { RoleEnum } from '../../types/enums'

const ProductsPage = () => {
  const role = useAppSelector((state) => state.auth.role)

  const isAdmin = role === RoleEnum.ADMIN

  return (
    <Box sx={styles.wrapper}>
      {isAdmin && <ProductForm />}
      <Box>ProductsPage</Box>
    </Box>
  )
}

export default ProductsPage
