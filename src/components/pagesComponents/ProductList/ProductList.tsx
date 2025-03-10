import { styles } from './ProductList.styles.ts'
import { Box, Button, ListItem, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { ProductFormValidationType, ResponseProductSchemaType } from '../../../types/products/products.ts'
import { useDeleteProductByIdMutation, useUpdateProductByIdMutation } from '../../../redux/products/productsApiSlice.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productFormValidation } from '../../../utils/models/productsSchemas'

type ProductFromProps = ResponseProductSchemaType & { isAdmin: boolean }

const ProductList: FC<ProductFromProps> = ({ id, title, description, price, images, isAdmin, category }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [deleteProduct] = useDeleteProductByIdMutation()
  const [editProduct] = useUpdateProductByIdMutation()

  const { ...methods } = useForm<ProductFormValidationType>({
    mode: 'onTouched',
    defaultValues: { title, price, description, images, category },
    resolver: zodResolver(productFormValidation),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<ProductFormValidationType> = (data) => {
    const updateProduct = {
      ...data,
      id,
    }
    editProduct(updateProduct).unwrap()
    setIsEdit(false)
  }

  const handleEditClick = () => {
    setIsEdit(!isEdit)
  }

  const handleDeleteProduct = () => {
    deleteProduct(id)
  }

  const isDisabled = !isValid || !isDirty || isSubmitting

  return (
    <>
      {isEdit && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register('title')} label="Title" error={!!errors.title} helperText={errors.title?.message} />
          <TextField
            {...register('description')}
            label="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register('price', { valueAsNumber: true })}
            type="number"
            label="Price"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <Box>
            <Button disabled={isDisabled} type="submit" variant="contained">
              Save
            </Button>
            <Button onClick={handleEditClick} type="button" variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      {!isEdit && (
        <ListItem sx={styles.listItem}>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
          <Typography>{price}</Typography>
          {images.map((image) => (
            <Box key={image} component="img" src={image} alt={image} />
          ))}
          {isAdmin && (
            <>
              <Button onClick={handleDeleteProduct} variant="contained">
                Delete
              </Button>
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>
            </>
          )}
        </ListItem>
      )}
    </>
  )
}

export default ProductList
