import { styles } from './ProductList.styles.ts'
import { Box, Button, ListItem, Typography } from '@mui/material'
import { FC } from 'react'
import { ResponseProductSchemaType } from '../../../types/products/products.ts'
import { useDeleteProductByIdMutation } from '../../../redux/products/productsApiSlice.ts'

type ProductFromProps = ResponseProductSchemaType & { isAdmin: boolean }

const ProductList: FC<ProductFromProps> = ({ id, title, description, price, images, isAdmin }) => {
  const [deleteProduct] = useDeleteProductByIdMutation()

  const handleDeleteProduct = () => {
    deleteProduct(id)
  }

  return (
    <ListItem sx={styles.listItem}>
      <Typography>{title}</Typography>
      <Typography>{description}</Typography>
      <Typography>{price}</Typography>
      {images.map((image) => (
        <Box key={image} component="img" src={image} alt={image} />
      ))}
      {isAdmin && (
        <Button onClick={handleDeleteProduct} variant="contained">
          Delete
        </Button>
      )}
    </ListItem>
  )
}

export default ProductList
