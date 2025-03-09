import { styles } from './CategoriesPage.styles.ts'
import { Box, CircularProgress } from '@mui/material'
import { useGetAllCategoriesQuery } from '../../redux/categories/categoriesApiSlice.ts'
import ErrorComponent from '../../components/pagesComponents/ErrorComponent'
import CategoryForm from '../../components/pagesComponents/CategoryForm'
import CategoryCard from '../../components/pagesComponents/CategoryCard'

const CategoriesPage = () => {
  const { data, isFetching, isError } = useGetAllCategoriesQuery()
  if (isError) {
    return <ErrorComponent />
  }

  if (isFetching || !data) {
    return <CircularProgress />
  }

  return (
    <Box>
      <CategoryForm />
      <Box sx={styles.box}>
        {data.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </Box>
    </Box>
  )
}

export default CategoriesPage
