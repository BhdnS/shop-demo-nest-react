import { styles } from './User.styles'
import { Box, Button, List, ListItem, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { SingleUserResponseSchemaType } from '../../../types/users/usersTypes.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { singleUserResponseSchema } from '../../../utils/models/usersSchemas'
import { useDeleteUserMutation, useEditUserMutation } from '../../../redux/users/usersApiSlice.ts'

type UserProps = {
  name: string
  role: string
  email: string
  id: number
}

const User: FC<UserProps> = ({ name, role, email, id }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editUser] = useEditUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const { ...methods } = useForm({
    mode: 'onTouched',
    defaultValues: { name, role, email, id },
    resolver: zodResolver(singleUserResponseSchema),
  })

  const onSubmit: SubmitHandler<SingleUserResponseSchemaType> = (data) => {
    editUser(data)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const handleEditClick = () => {
    setIsEdit(true)
  }

  const handleCancelEditClick = () => {
    setIsEdit(false)
  }

  const handleDeleteUser = () => {
    deleteUser(id)
  }

  return (
    <>
      {isEdit && (
        <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={styles.form}>
          <TextField {...register('name')} label="name" error={!!errors.name} helperText={errors.name?.message} />
          <TextField {...register('role')} label="role" error={!!errors.role} helperText={errors.role?.message} />
          <TextField {...register('email')} label="email" error={!!errors.email} helperText={errors.email?.message} />
          <Box sx={styles.btnBox}>
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button onClick={handleCancelEditClick} type="button" variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      {!isEdit && (
        <List sx={styles.list}>
          <ListItem>{name}</ListItem>
          <ListItem>{role}</ListItem>
          <ListItem>{email}</ListItem>
          <Box sx={styles.btnBox}>
            <Button onClick={handleEditClick} variant="contained">
              Edit
            </Button>
            <Button onClick={handleDeleteUser} variant="contained">
              Delete
            </Button>
          </Box>
        </List>
      )}
    </>
  )
}

export default User
