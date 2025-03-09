import { styles } from './CategoryForm.styles.ts'
import { Box, Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateCategorySchemaType } from '../../../types/categories/categoriesTypes.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategorySchema } from '../../../utils/models/categoriesSchemas'
import { useCreateCategoryMutation } from '../../../redux/categories/categoriesApiSlice.ts'

const CategoryForm = () => {
  const [createCategory] = useCreateCategoryMutation()

  const { ...methods } = useForm<CreateCategorySchemaType>({
    mode: 'onTouched',
    defaultValues: { name: '', image: '' },
    resolver: zodResolver(createCategorySchema),
  })

  const onSubmit: SubmitHandler<CreateCategorySchemaType> = (data) => {
    createCategory(data)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = methods

  const isDisabled = !isValid || !isDirty || isSubmitting

  return (
    <Box sx={styles.form} onSubmit={handleSubmit(onSubmit)} component="form">
      <TextField {...register('name')} label="Name" error={!!errors.name} helperText={errors.name?.message} />
      <TextField {...register('image')} label="Image" error={!!errors.image} helperText={errors.image?.message} />
      <Button disabled={isDisabled} variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  )
}

export default CategoryForm
