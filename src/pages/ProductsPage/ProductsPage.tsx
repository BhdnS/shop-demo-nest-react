import { styles } from './ProductsPage.styles.ts'
import { Box, CircularProgress, List } from '@mui/material'
import { useAppSelector } from '../../hooks'
import ProductForm from '../../components/pagesComponents/ProductForm'
import { RoleEnum } from '../../types/enums'
import { useParams } from 'react-router'
import { useGetProductsByCategoryQuery } from '../../redux/products/productsApiSlice.ts'
import ErrorComponent from '../../components/pagesComponents/ErrorComponent'
import ProductList from '../../components/pagesComponents/ProductList'

const ProductsPage = () => {
  const { id } = useParams()
  const category = parseInt(id as string)
  const role = useAppSelector((state) => state.auth.role)
  const { data, isFetching, isError } = useGetProductsByCategoryQuery(category)

  if (isError) {
    return <ErrorComponent />
  }

  if (isFetching || !data) {
    return <CircularProgress />
  }

  const isAdmin = role === RoleEnum.ADMIN

  return (
    <Box sx={styles.wrapper}>
      {isAdmin && <ProductForm />}
      <List>
        {data.map((product) => (
          <ProductList {...product} key={product.id} isAdmin={isAdmin} />
        ))}
      </List>
    </Box>
  )
}

export default ProductsPage
