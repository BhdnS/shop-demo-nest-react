import { styles } from './LoginPage.styles'
import { Box, Button, TextField } from '@mui/material'
import { useAppDispatch, useRedirect } from '../../hooks'
import { useLoginMutation } from '../../redux/auth/authApiSlice.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginValidationSchemaType } from '../../types/auth/authTypes.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginValidationSchema } from '../../utils/models/authSchemas'
import { setCredentials } from '../../redux/auth/authSlice.ts'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RoutesEnum } from '../../types/enums'

const defaultValues: LoginValidationSchemaType = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const [loginUser] = useLoginMutation()
  const redirect = useRedirect()

  const { ...methods } = useForm<LoginValidationSchemaType>({
    mode: 'onTouched',
    defaultValues,
    resolver: zodResolver(loginValidationSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setError,
  } = methods

  const onSubmit: SubmitHandler<LoginValidationSchemaType> = async (data) => {
    try {
      const response = await loginUser(data).unwrap()
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
          <Box sx={styles.formTitle}>Login</Box>
          <Box sx={styles.formFields}>
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
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
