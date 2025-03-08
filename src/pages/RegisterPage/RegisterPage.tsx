import { styles } from './RegisterPage.styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField } from '@mui/material'
import { useAppDispatch, useRedirect } from '../../hooks'
import { useRegisterMutation } from '../../redux/auth/authApiSlice.ts'
import { setCredentials } from '../../redux/auth/authSlice.ts'
import { registerValidationSchema } from '../../utils/models/authSchemas'
import { RegisterValidationSchemaType } from '../../types/auth/authTypes.ts'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RoutesEnum } from '../../types/enums'

const defaultValues: RegisterValidationSchemaType = {
  email: '',
  name: '',
  password: '',
}

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const [registerUser] = useRegisterMutation()
  const redirect = useRedirect()

  const { ...methods } = useForm<RegisterValidationSchemaType>({
    mode: 'onTouched',
    defaultValues,
    resolver: zodResolver(registerValidationSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setError,
  } = methods

  const onSubmit: SubmitHandler<RegisterValidationSchemaType> = async (data) => {
    try {
      const response = await registerUser(data).unwrap()
      const { token, name, id, email, role } = response

      dispatch(setCredentials({ token, name, id, email, role }))
      redirect(`/${RoutesEnum.DASHBOARD}`)
    } catch (error) {
      const statusCode = (error as FetchBaseQueryError)?.status as number
      if (statusCode === 409) {
        setError('email', { message: 'Email is already taken' })
      } else {
        setError('email', { message: 'Something went wrong' })
      }
    }
  }

  const isDisabled = !isValid || !isDirty || isSubmitting

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.form} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.formContainer}>
          <Box sx={styles.formTitle}>Register</Box>
          <Box sx={styles.formFields}>
            <Box sx={styles.formField}>
              <TextField
                {...register('name')}
                label="Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Box>
            <Box sx={styles.formField}>
              <TextField
                {...register('email')}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
            <Box sx={styles.formField}>
              <TextField
                {...register('password')}
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>
          </Box>
          <Box sx={styles.formActions}>
            <Button disabled={isDisabled} type="submit" variant="contained" color="primary" sx={styles.submitButton}>
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterPage
