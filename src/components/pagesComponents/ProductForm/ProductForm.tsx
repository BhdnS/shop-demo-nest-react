import { styles } from './ProductForm.styles.ts'
import { Box, Button, Chip, TextField } from '@mui/material'
import { useParams } from 'react-router'
import { useCreateProductMutation } from '../../../redux/products/productsApiSlice.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProductFormValidationType } from '../../../types/products/products.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { productFormValidation } from '../../../utils/models/productsSchemas'

const ProductForm = () => {
  const { id } = useParams<{ id: string }>()
  const [createProduct] = useCreateProductMutation()
  const [newImage, setNewImage] = useState<string>('')

  const category = parseInt(id as string)

  const { ...methods } = useForm<ProductFormValidationType>({
    mode: 'onTouched',
    defaultValues: { category, description: '', images: [], price: 0, title: '' },
    resolver: zodResolver(productFormValidation),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = methods

  const images = watch('images')

  const onSubmit: SubmitHandler<ProductFormValidationType> = (data) => {
    const product = { ...data, category }

    createProduct(product).unwrap()
    reset()
  }

  const handleAddImage = () => {
    if (newImage.trim() !== '') {
      setValue('images', [...images, newImage], { shouldDirty: false })
      setNewImage('')
    }
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setNewImage(e.target.value)
  }

  const handleRemoveImage = (imageToRemove: string) => {
    const updatedImages = images.filter((image) => image !== imageToRemove)
    setValue('images', updatedImages)
  }

  const isDisabled = !isValid || !isDirty || isSubmitting

  return (
    <Box sx={styles.form} component="form" onSubmit={handleSubmit(onSubmit)}>
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
      <Box sx={styles.image}>
        <TextField label="Add Image URL" value={newImage} onChange={handleChangeImage} fullWidth />
        <Button onClick={handleAddImage} variant="contained">
          +
        </Button>
      </Box>
      <Box>
        {images.map((image, index) => (
          <Chip key={index} label={image} onDelete={() => handleRemoveImage(image)} sx={{ margin: '4px' }} />
        ))}
      </Box>
      <Button disabled={isDisabled} variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  )
}

export default ProductForm
