import { styles } from './CategoryCard.styles.ts'
import { Box, Button, Link } from '@mui/material'
import { RoleEnum, RoutesEnum } from '../../../types/enums'
import { Link as RouterLink } from 'react-router'
import { useAppSelector } from '../../../hooks'
import { useDeleteCategoryMutation } from '../../../redux/categories/categoriesApiSlice.ts'
import { FC } from 'react'
import { ResponseCategorySchemaType } from '../../../types/categories/categoriesTypes.ts'

const CategoryCard: FC<ResponseCategorySchemaType> = ({ id, name, image }) => {
  const role = useAppSelector((state) => state.auth.role)
  const isAdmin = role === RoleEnum.ADMIN
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleDeleteCategory = () => {
    deleteCategory(id)
  }

  return (
    <Box sx={styles.card}>
      <Link to={`/${RoutesEnum.PRODUCTS}/${id}`} component={RouterLink}>
        {name}
      </Link>
      <Box component={'img'} src={image} alt={name} />
      {isAdmin && (
        <Button variant="contained" onClick={handleDeleteCategory}>
          Delete
        </Button>
      )}
    </Box>
  )
}

export default CategoryCard
